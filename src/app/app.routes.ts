import { Routes } from '@angular/router';
import { homeGuard } from './core/guards/home.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    // canActivate: [homeGuard],
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },  
  {
    path: 'registro',
    title: 'Registro',
    // canActivate: [homeGuard],
    loadComponent: () => import('./pages/auth/registro/registro.component').then(m => m.RegistroComponent)
  },  
  {
    path: 'main',
    // canActivate: [authGuard],
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
    children: [
      // HOME
      {
        path: 'inicio',
        title: 'Tarea',
        loadComponent: () => import('./pages/main/home/home.component').then(m => m.HomeComponent)
      },


      // DEFAULT dentro de main
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },

  // ========== RAÍZ Y 404 ==========
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'main/inicio'
  }
];
