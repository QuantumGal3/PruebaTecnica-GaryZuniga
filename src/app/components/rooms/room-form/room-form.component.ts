import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../../services/rooms.service';
import { Room } from '../../../models/room.model';

@Component({
  selector: 'app-room-form',
  imports: [ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {
  roomForm: FormGroup;
  isEditMode = false;
  roomId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roomsService: RoomsService
  ) {
    this.roomForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required, Validators.min(20), Validators.max(300)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.roomId = +params['id'];
        this.loadRoomData();
      }
    });
  }

  loadRoomData(): void {
    if (this.roomId) {
      this.loading = true;
      const room = this.roomsService.getRoomById(this.roomId);
      if (room) {
        this.roomForm.patchValue({
          name: room.name,
          capacity: room.capacity
        });
      }
      this.loading = false;
    }
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.loading = true;
      const roomData = this.roomForm.value;

      if (this.isEditMode && this.roomId) {
        this.roomsService.updateRoom(this.roomId, roomData);
      } else {
        this.roomsService.addRoom(roomData);
      }

      this.loading = false;
      this.router.navigate(['/rooms']);
    }
  }

  goBack(): void {
    this.router.navigate(['/rooms']);
  }
}
