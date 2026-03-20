import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-servicios',
  standalone: true,
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class ServiciosComponent {

  @ViewChild('slider') slider!: ElementRef;

  scrollIzquierda(){
    this.slider.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollDerecha(){
    this.slider.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

}