import { Component } from '@angular/core';

import { HeaderComponent } from '../header/header';
import { HeroComponent } from '../hero/hero';
import { ServiciosComponent } from '../servicios/servicios';
import { SobreMiComponent } from '../sobre-mi/sobre-mi';
import { TestimoniosComponent } from '../testimonios/testimonios';
import { AgendaComponent } from '../agenda/agenda';
import { ContactoComponent } from '../contacto/contacto';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ServiciosComponent,
    SobreMiComponent,
    TestimoniosComponent,
    AgendaComponent,
    ContactoComponent,
    FooterComponent
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPageComponent {}
