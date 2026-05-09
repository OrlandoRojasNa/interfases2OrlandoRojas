import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  scrolled = false;
  cartOpen = false;
  readonly currentUser = this.authService.currentUser;
  readonly cartItems = this.cartService.items;
  readonly cartCount = this.cartService.totalItems;
  readonly cartTotal = this.cartService.totalPrice;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  closeCart(): void {
    this.cartOpen = false;
  }

  removeItem(itemId: string): void {
    this.cartService.removeItem(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  logout(): void {
    this.authService.logout();
  }

  getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
      return 'U';
    }

    const first = parts[0]?.charAt(0) ?? 'U';
    const second = parts.length > 1 ? parts[1].charAt(0) : parts[0].charAt(1) ?? '';

    return `${first}${second}`.toUpperCase();
  }

  trackItemById(index: number, item: CartItem): string {
    return item.id;
  }

}