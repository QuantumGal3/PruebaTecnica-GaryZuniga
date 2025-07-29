import { Injectable } from '@angular/core';
import { MoviesService } from './movies.service';
import { RoomsService } from './rooms.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private moviesService: MoviesService,
    private roomsService: RoomsService
  ) {}

  getDashboardStats() {
    return this.moviesService.getPopularMovies().pipe(
      map(movies => {
        const rooms = this.roomsService.getAllRooms();
        return {
          totalMovies: movies.total_results,
          totalRooms: rooms.length,
          availableRooms: rooms.filter(room => room.movies.length < 3).length
        };
      })
    );
  }
}
