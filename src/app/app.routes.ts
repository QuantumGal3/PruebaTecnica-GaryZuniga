import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { RoomListComponent } from './components/rooms/room-list/room-list.component';


export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
    {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rooms',
    component: RoomListComponent,
    canActivate: [AuthGuard]
  },
];
