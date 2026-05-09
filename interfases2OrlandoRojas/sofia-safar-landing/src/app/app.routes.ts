import { Routes } from '@angular/router';

import { Login } from './componentes/login/login';
import { LandingComponent } from './componentes/landing/landing';
import { PerfilComponent } from './componentes/perfil/perfil';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: Login },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
