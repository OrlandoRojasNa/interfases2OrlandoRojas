import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CartService } from '../../services/cart.service';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class ServiciosComponent {
  readonly services: ServiceCard[] = [
    {
      id: 'limpieza-facial',
      title: 'Limpieza facial profunda',
      description: 'Elimina impurezas y deja tu piel fresca y luminosa.',
      image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea',
      price: 85000,
    },
    {
      id: 'radiofrecuencia',
      title: 'Radiofrecuencia',
      description: 'Reafirma la piel y combate la flacidez.',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35',
      price: 110000,
    },
    {
      id: 'cavitacion',
      title: 'Cavitación',
      description: 'Reduce grasa localizada sin cirugía.',
      image: 'https://images.unsplash.com/photo-1588776814546-ec7e7b0c3c02',
      price: 125000,
    },
    {
      id: 'vacumterapia',
      title: 'Vacumterapia',
      description: 'Moldea tu figura y mejora la circulación.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09',
      price: 98000,
    },
    {
      id: 'maderoterapia',
      title: 'Maderoterapia',
      description: 'Tratamiento natural para tonificar el cuerpo.',
      image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9',
      price: 102000,
    },
  ];

  constructor(private readonly cartService: CartService) {}

  addToCart(service: ServiceCard): void {
    this.cartService.addItem({
      id: service.id,
      name: service.title,
      description: service.description,
      price: service.price,
    });
  }

  trackByServiceId(index: number, service: ServiceCard): string {
    return service.id;
  }

}