import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { HomeComponent } from './modules/home/components/home.component';
import { ProfileComponent } from './modules/profile/components/profile.component';
import { CareersComponent } from './modules/careers/components/careers.component';
import { ArticlesComponent } from './modules/articles/components/articles.component';
import { NewOrderComponent } from './modules/order/components/new-order/new-order.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    title: 'Nawloan - Home'
  },
  {
    path: "careers",
    component: CareersComponent,
    title: 'Nawloan - Careers'
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    loadChildren: () => import('./modules/articles/articles.module')
      .then(m => m.ArticlesModule),
  },
  {
    path: "login",
    component: LoginComponent,
    title: 'Nawloan - Login'
  },
  {
    path: 'register',
    component: SignupComponent,
    loadChildren: () => import('./core/auth/signup/signup-routing.module')
      .then(m => m.SignupRoutingModule),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    loadChildren: () => import('./modules/profile/profile.module')
      .then(m => m.ProfileModule),
  },
  {
    path: 'new-order',
    component: NewOrderComponent,
    loadChildren: () => import('./modules/order/new-order.module').then(m => m.NewOrderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
