import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Login } from './componentes/login/login';
import { PerfilComponent } from './componentes/perfil/perfil';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}