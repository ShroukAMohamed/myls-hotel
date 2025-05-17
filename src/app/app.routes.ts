import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':lang',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { path: '', redirectTo: '/en', pathMatch: 'full' },
];
