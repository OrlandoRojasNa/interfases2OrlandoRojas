import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Vital para el [(ngModel)]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrégalos aquí
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  mode: string = 'login';
  errorMessage: string = '';
  message: string = '';
  
  loginModel = { email: '', password: '' };
  registerModel = { name: '', email: '', phone: '', password: '', confirmPassword: '' };

  toggleMode(newMode: string) {
    this.mode = newMode;
  }

  submitLogin() { console.log('Login', this.loginModel); }
  submitRegister() { console.log('Registro', this.registerModel); }
}