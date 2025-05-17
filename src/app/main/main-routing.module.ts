import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./../layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./home/pages/landing-page/landing-page.component').then(c => c.LandingPageComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login-page/login-page.component').then(c => c.LoginPageComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/pages/register-page/register-page.component').then(c => c.RegisterPageComponent)
      },
      {
        path: 'houses',
        loadComponent: () => import('./houses/pages/houses-page/houses-page.component').then(c => c.HousesPageComponent)
      },
      {
        path: 'admin',
        loadComponent: () => import('./admin/pages/admin-panel-page/admin-panel-page.component').then(c => c.AdminPanelPageComponent)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
