import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  scrolled = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

	get currentUser$() {
		return this.authService.currentUser$;
	}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/');
  }

}