import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.error = '';
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }
}
