import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Room, RoomAvailability } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private rooms: Room[] = [
    { id: 1, name: 'Sala 1', capacity: 100, movies: [1, 2] },
    { id: 2, name: 'Sala 2', capacity: 80, movies: [3, 4, 5] },
    { id: 3, name: 'Sala 3', capacity: 120, movies: [] }
  ];

  constructor() {}

  getAllRooms(): Room[] {
    return this.rooms;
  }

  getRoomById(id: number): Room | undefined {
    return this.rooms.find(room => room.id === id);
  }

  addRoom(room: Omit<Room, 'id'>): Room {
    const newId = Math.max(...this.rooms.map(r => r.id)) + 1;
    const newRoom = { ...room, id: newId };
    this.rooms.push(newRoom);
    return newRoom;
  }

  updateRoom(id: number, roomData: Partial<Room>): Room | undefined {
    const roomIndex = this.rooms.findIndex(r => r.id === id);
    if (roomIndex !== -1) {
      this.rooms[roomIndex] = { ...this.rooms[roomIndex], ...roomData };
      return this.rooms[roomIndex];
    }
    return undefined;
  }

  deleteRoom(id: number): boolean {
    const initialLength = this.rooms.length;
    this.rooms = this.rooms.filter(room => room.id !== id);
    return this.rooms.length !== initialLength;
  }

  getRoomAvailability(roomId: number): RoomAvailability {
    const room = this.getRoomById(roomId);
    if (!room) throw new Error('Sala no encontrada');

    const assignedMovies = room.movies.length;
    let status: RoomAvailability['status'];

    if (assignedMovies < 3) {
      status = 'available';
    } else if (assignedMovies >= 3 && assignedMovies <= 5) {
      status = 'almost-full';
    } else {
      status = 'full';
    }

    return {
      roomId,
      roomName: room.name,
      status,
      assignedMovies
    };
  }

  assignMovieToRoom(roomId: number, movieId: number): boolean {
    const room = this.getRoomById(roomId);
    if (room && !room.movies.includes(movieId)) {
      room.movies.push(movieId);
      return true;
    }
    return false;
  }

  removeMovieFromRoom(roomId: number, movieId: number): boolean {
    const room = this.getRoomById(roomId);
    if (room) {
      const initialLength = room.movies.length;
      room.movies = room.movies.filter(id => id !== movieId);
      return room.movies.length !== initialLength;
    }
    return false;
  }
}
