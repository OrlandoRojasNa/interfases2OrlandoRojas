import { Component } from '@angular/core';

import { HeaderComponent } from './componentes/header/header';
import { HeroComponent } from './componentes/hero/hero';
import { ServiciosComponent } from './componentes/servicios/servicios';
import { SobreMiComponent } from './componentes/sobre-mi/sobre-mi';
import { TestimoniosComponent } from './componentes/testimonios/testimonios';
import { AgendaComponent } from './componentes/agenda/agenda';
import { ContactoComponent } from './componentes/contacto/contacto';
import { FooterComponent } from './componentes/footer/footer';

@Component({
  selector: 'app-root',
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

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}