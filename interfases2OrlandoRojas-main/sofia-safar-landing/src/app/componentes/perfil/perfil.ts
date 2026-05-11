import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-perfil',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './perfil.html',
	styleUrl: './perfil.css',
})
export class PerfilComponent {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
	) {}

	get currentUser$() {
		return this.authService.currentUser$;
	}

	/**
	 * Devuelve la inicial del nombre para el avatar.
	 */
	getInitial(name: string): string {
		return (name?.trim().charAt(0) || 'S').toUpperCase();
	}

	/**
	 * Formatea la fecha de registro para la vista.
	 */
	formatDate(value: string): string {
		return new Date(value).toLocaleDateString('es-CO', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		});
	}

	/**
	 * Cierra la sesión y vuelve al landing.
	 */
	logout(): void {
		this.authService.logout();
		void this.router.navigateByUrl('/');
	}
}