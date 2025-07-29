import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/movies.service';
import { MovieDetails } from '../../../models/movie.model';


@Component({
  standalone: true,
  imports: [],
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);

  movie = signal<MovieDetails | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    this.loadMovie(movieId);
  }

  loadMovie(id: number): void {
    this.loading.set(true);
    this.moviesService.getMovieDetails(id).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
