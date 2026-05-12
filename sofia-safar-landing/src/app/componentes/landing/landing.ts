import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Esto quita los errores NG8103
import { DataService } from '../../services/data'; 

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule], // IMPORTANTE: Agregarlo aquí
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit {
  listaEspecialistas: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEspecialistas().subscribe({
      next: (data) => this.listaEspecialistas = data,
      error: (err) => console.error('Error:', err)
    });
  }
}