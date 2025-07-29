export interface Room {
  id: number;
  name: string;
  capacity: number;
  movies: number[];
}

export interface RoomAvailability {
  roomId: number;
  roomName: string;
  status: 'available' | 'almost-full' | 'full';
  assignedMovies: number;
}
