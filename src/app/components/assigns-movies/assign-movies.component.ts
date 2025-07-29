import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { Movie } from '../../models/movie.model';
import { RoomsService } from '../../services/rooms.service';
import { MoviesService } from '../../services/movies.service';


@Component({
  selector: 'app-assign-movies',
  templateUrl: './assign-movies.component.html',
})
export class AssignMoviesComponent implements OnInit {
  roomId!: number;
  room!: Room;
  allMovies: Movie[] = [];
  assignedMovies: Movie[] = [];
  availableMovies: Movie[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomsService: RoomsService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.roomId = +this.route.snapshot.params['id'];
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    const room = this.roomsService.getRoomById(this.roomId);
    if (!room) {
      this.router.navigate(['/rooms']);
      return;
    }
    this.room = room;

    this.moviesService.getPopularMovies().subscribe({
      next: (response) => {
        this.allMovies = response.results;
        this.updateMovieLists();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateMovieLists(): void {
    this.assignedMovies = this.allMovies.filter(movie =>
      this.room.movies.includes(movie.id)
    );
    this.availableMovies = this.allMovies.filter(movie =>
      !this.room.movies.includes(movie.id)
    );
  }

  assignMovie(movieId: number): void {
    if (this.roomsService.assignMovieToRoom(this.roomId, movieId)) {
      this.loadData();
    }
  }

  removeMovie(movieId: number): void {
    if (this.roomsService.removeMovieFromRoom(this.roomId, movieId)) {
      this.loadData();
    }
  }

  goBack(): void {
    this.router.navigate(['/rooms']);
  }
}
