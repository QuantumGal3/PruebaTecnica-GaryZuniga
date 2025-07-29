import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../../services/movies.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  isEditMode = false;
  movieId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      overview: ['', Validators.required],
      release_date: ['', Validators.required],
      vote_average: [0, [Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.movieId = +params['id'];
        this.loadMovieData();
      }
    });
  }

  loadMovieData(): void {
    if (this.movieId) {
      this.loading = true;
      this.moviesService.getMovieDetails(this.movieId).subscribe({
        next: (movie) => {
          this.movieForm.patchValue({
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            vote_average: movie.vote_average
          });
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading movie', err);
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      this.loading = true;
      const movieData = this.movieForm.value;

      console.log('Datos a guardar:', movieData);

      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/movies']);
      }, 1000);
    }
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
