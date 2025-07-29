import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  loading = true;
  error: string | null = null;
  searchQuery = '';
  currentPage = 1;

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPopularMovies();
  }

  loadPopularMovies(): void {
    this.loading = true;
    this.error = null;
    this.moviesService.getPopularMovies(this.currentPage).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.filteredMovies = [...this.movies];
        this.loading = false;
      },
      error: (err) => {
        this.handleError('Error al cargar películas');
      }
    });
  }

  searchMovies(): void {
    if (!this.searchQuery.trim()) {
      this.filteredMovies = [...this.movies];
      return;
    }

    this.loading = true;
    this.moviesService.searchMovies(this.searchQuery).subscribe({
      next: (response) => {
        this.filteredMovies = response.results;
        this.loading = false;
      },
      error: (err) => {
        this.handleError('Error en la búsqueda');
      }
    });
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.loadPopularMovies();
  }

  private handleError(message: string): void {
    this.error = message;
    this.loading = false;
    setTimeout(() => this.error = null, 3000);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/movies', id]);
  }
}
