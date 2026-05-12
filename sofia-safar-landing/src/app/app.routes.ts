import { Routes } from '@angular/router';
// Ajusta la ruta a tu carpeta real:
import { Landing } from './componentes/landing/landing';
import { LoginComponent } from './componentes/login/login';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: LoginComponent },
  // ... otras rutas
];