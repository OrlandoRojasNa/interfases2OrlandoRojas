import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

interface CartServiceItem {
  id: string;
  name: string;
  price: number;
}

interface CartLineItem {
  service: CartServiceItem;
  quantity: number;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly authState$ = this.authService.state$;

  readonly availableServices: CartServiceItem[] = [
    { id: 'limpieza-facial', name: 'Limpieza facial profunda', price: 85000 },
    { id: 'radiofrecuencia', name: 'Radiofrecuencia', price: 120000 },
    { id: 'cavitacion', name: 'Cavitación', price: 135000 },
    { id: 'vacumterapia', name: 'Vacumterapia', price: 110000 },
    { id: 'maderoterapia', name: 'Maderoterapia', price: 95000 },
  ];

  scrolled = false;
  userMenuOpen = false;
  cartOpen = false;
  cartItems: CartLineItem[] = [];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.userMenuOpen = false;
    this.cartOpen = false;
  }

  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    this.cartOpen = false;
    this.userMenuOpen = !this.userMenuOpen;
  }

  toggleCart(event: MouseEvent) {
    event.stopPropagation();
    this.userMenuOpen = false;
    this.cartOpen = !this.cartOpen;
  }

  onAvatarKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.userMenuOpen = !this.userMenuOpen;
    }
  }

  addServiceToCart(service: CartServiceItem) {
    const existingItem = this.cartItems.find((item) => item.service.id === service.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems = [...this.cartItems];
      return;
    }

    this.cartItems = [...this.cartItems, { service, quantity: 1 }];
  }

  removeServiceFromCart(serviceId: string) {
    this.cartItems = this.cartItems
      .map((item) => {
        if (item.service.id !== serviceId) {
          return item;
        }

        return { ...item, quantity: item.quantity - 1 };
      })
      .filter((item) => item.quantity > 0);
  }

  clearCart(event?: MouseEvent) {
    event?.stopPropagation();
    this.cartItems = [];
  }

  get cartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.service.price * item.quantity, 0);
  }

  formatCop(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  getWhatsAppCheckoutUrl(): string {
    if (!this.cartItems.length) {
      return 'https://wa.me/573000000000';
    }

    const lines = this.cartItems.map((item) => `- ${item.service.name} x${item.quantity}: ${this.formatCop(item.service.price * item.quantity)}`);
    const message = [
      'Hola, quiero agendar y comprar estos servicios:',
      ...lines,
      `Total: ${this.formatCop(this.cartTotal)}`,
    ].join('%0A');

    return `https://wa.me/573000000000?text=${message}`;
  }

  logout(event?: MouseEvent) {
    event?.stopPropagation();
    this.authService.logout();
    this.userMenuOpen = false;
    this.cartOpen = false;
    this.cartItems = [];
    void this.router.navigate(['/']);
  }

}