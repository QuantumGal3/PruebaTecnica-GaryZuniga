import { Component } from '@angular/core';
import { RoomsService } from '../../../services/rooms.service';
import { Room, RoomAvailability } from '../../../models/room.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-list',
  imports: [RouterModule],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {
  rooms: Room[] = [];
  roomAvailabilities: RoomAvailability[] = [];

  constructor(
    private roomsService: RoomsService,
    private router: Router
  ) {
    this.loadRooms();
  }

  loadRooms(): void {
    this.rooms = this.roomsService.getAllRooms();
    this.roomAvailabilities = this.rooms.map(room =>
      this.roomsService.getRoomAvailability(room.id)
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available': return 'bg-success';
      case 'almost-full': return 'bg-warning text-dark';
      case 'full': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'available': return 'Sala disponible';
      case 'almost-full': return `Sala con ${this.roomAvailabilities.find(a => a.status === status)?.assignedMovies} películas`;
      case 'full': return 'Sala no disponible';
      default: return 'Estado desconocido';
    }
  }

  navigateToAssignMovies(roomId: number): void {
    this.router.navigate(['/rooms', roomId, 'assign']);
  }
}
