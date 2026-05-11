import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

type AuthMode = 'login' | 'register';

interface LoginModel {
  email: string;
  password: string;
}

interface RegisterModel extends LoginModel {
  name: string;
  phone: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  mode: AuthMode = 'login';
  loginModel: LoginModel = {
    email: '',
    password: '',
  };
  registerModel: RegisterModel = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };
  message = '';
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  toggleMode(mode: AuthMode): void {
    this.mode = mode;
    this.message = '';
    this.errorMessage = '';
  }

  submitLogin(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.loginModel.email.trim() || !this.loginModel.password.trim()) {
      this.errorMessage = 'Completa tu correo y contraseña para continuar.';
      return;
    }

    if (this.loginModel.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    try {
      this.authService.login(this.loginModel);
      void this.router.navigateByUrl('/perfil');
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'No fue posible iniciar sesión.';
    }
  }

  submitRegister(): void {
    this.message = '';
    this.errorMessage = '';

    const { name, email, phone, password, confirmPassword } = this.registerModel;

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (!this.isValidEmail(email)) {
      this.errorMessage = 'Ingresa un correo electrónico válido.';
      return;
    }

    if (password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      this.authService.register({ name, email, phone, password });
      void this.router.navigateByUrl('/perfil');
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'No fue posible registrar la cuenta.';
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }
}
