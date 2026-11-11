// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/login/login';
import { RegisterComponent } from './dashboard/register/register';
import { Dashboard } from './dashboard/dashboard/dashboard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inventory/new', component: Dashboard, pathMatch: 'full' },
  { path: 'orders/new', component: Dashboard, pathMatch: 'full' },
  { path: 'customers/new', component: Dashboard, pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'inventory', component: Dashboard },
  { path: 'orders', component: Dashboard },
  { path: 'customers', component: Dashboard },
  { path: 'reports', component: Dashboard },
  { path: 'settings', component: Dashboard },
  { path: 'themes', component: Dashboard },
  { path: 'profile', component: Dashboard },
  // Redirect empty path to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Optional: Wildcard route for 404 pages
  { path: '**', redirectTo: 'login' }
];
