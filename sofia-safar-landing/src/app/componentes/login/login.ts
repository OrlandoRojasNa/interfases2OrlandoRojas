import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Vital para el [(ngModel)]
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Agrégalos aquí
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  mode: string = 'login';
  errorMessage: string = '';
  message: string = '';
  
  loginModel = { email: '', password: '' };
  registerModel = { name: '', email: '', phone: '', password: '', confirmPassword: '' };

  toggleMode(newMode: string) {
    this.mode = newMode;
  }

  submitLogin() {
    this.errorMessage = '';
    this.message = '';

    const email = this.loginModel.email.trim();
    const password = this.loginModel.password.trim();

    if (!email || !email.includes('@') || password.length < 6) {
      this.errorMessage = 'Completa un correo válido y una contraseña de al menos 6 caracteres.';
      return;
    }

    this.authService.login(email);
    this.message = 'Ingreso exitoso. Redirigiendo...';

    void this.router.navigate(['/']);
  }

  submitRegister() {
    this.errorMessage = '';
    this.message = '';

    if (this.registerModel.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.registerModel.password !== this.registerModel.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.authService.login(this.registerModel.email.trim(), this.registerModel.name.trim());
    this.message = 'Registro exitoso. Redirigiendo...';

    void this.router.navigate(['/']);
  }
}