import { Routes } from '@angular/router';
import { LandingPageComponent } from './componentes/landing-page/landing-page';
import { LoginComponent } from './componentes/login/login';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
];