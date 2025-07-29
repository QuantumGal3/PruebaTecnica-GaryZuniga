import { Component, signal } from '@angular/core';

type Movie = {
  id: number;
  title: string;
  assigned: boolean;
};

@Component({
  selector: 'app-assign-list',
  templateUrl: './assign-list.component.html',
  styleUrls: ['./assign-list.component.css'],
  standalone: true,
})
export class AssignListComponent {
  movies = signal<Movie[]>([
    { id: 1, title: 'El Padrino', assigned: false },
    { id: 2, title: 'Pulp Fiction', assigned: false },
    { id: 3, title: 'El Señor de los Anillos', assigned: false },
  ]);

  assignedMovies = signal<Movie[]>([]);

  assignMovie(movie: Movie): void {
    this.movies.update(list => list.filter(m => m.id !== movie.id));
    this.assignedMovies.update(list => [...list, { ...movie, assigned: true }]);
  }

  unassignMovie(movie: Movie): void {
    this.assignedMovies.update(list => list.filter(m => m.id !== movie.id));
    this.movies.update(list => [...list, { ...movie, assigned: false }]);
  }
}
