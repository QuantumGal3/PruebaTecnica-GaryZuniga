import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  stats = {
    totalMovies: 0,
    totalRooms: 0,
    availableRooms: 0
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data', error);
        this.loading = false;
      }
    });

  }
}
