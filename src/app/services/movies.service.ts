import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Movie,
  MovieListResponse,
  MovieDetails
} from '../models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number = 1): Observable<MovieListResponse> {
    return this.http.get<MovieListResponse>(
      `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}&language=es-MX`
    );
  }

  searchMovies(query: string, page: number = 1): Observable<MovieListResponse> {
    return this.http.get<MovieListResponse>(
      `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}&language=es-MX`
    );
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=es-MX`
    );
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    return path
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : 'assets/no-image.jpg';
  }
}
