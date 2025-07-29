import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly validUser = {
    username: 'admin',
    password: '1234'
  };
  private isAuthenticated = false;

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  login(username: string, password: string): boolean {
    if (username === this.validUser.username && password === this.validUser.password) {
      this.isAuthenticated = true;
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('isLoggedIn') === 'true';
  }

  private checkAuthStatus(): void {
    this.isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  }
}
