import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup.component';
import { RegServiceSeekerComponent } from './components/reg-service-seeker/reg-service-seeker.component';
import { RegServiceProviderComponent } from './components/reg-service-provider/reg-service-provider.component';
import { OtpCodeComponent } from '../otp-code/otp-code.component';

const routes: Routes = [
  {
    path: 'register',
    component: SignupComponent,
    title: 'Nawloan - Signup',
    children: [
      {
        path: 'service-seeker',
        component: RegServiceSeekerComponent
      },
      {
        path: 'service-provider',
        component: RegServiceProviderComponent,
      },
      {
        path: 'otp',
        component: OtpCodeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
