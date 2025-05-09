import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'ar', pathMatch: 'full' },
  {
    path: ':lang',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
];
