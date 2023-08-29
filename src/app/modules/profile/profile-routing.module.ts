import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordOtpComponent } from './components/password-reset/password-otp/password-otp.component';
import { NewPasswordComponent } from './components/password-reset/new-password/new-password.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'details',
        component: UserInformationComponent
      },
      {
        path: 'orders-history',
        component: OrdersHistoryComponent
      },
      {
        path: 'password',
        component: PasswordResetComponent,
        children: [
          {
            path: 'otp',
            component: PasswordOtpComponent
          },
          {
            path: 'reset',
            component: NewPasswordComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
