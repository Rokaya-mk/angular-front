import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ProfileComponent } from './components/profile.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { ProfileTitleComponent } from './shared/profile-title/profile-title.component';
import { ImageInputComponent } from './shared/image-input/image-input.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { DriverDetailsComponent } from './components/user-information/components/driver-details/driver-details.component';
import { PersonalDetailsComponent } from './components/user-information/components/personal-details/personal-details.component';
import { CompanyDetailsComponent } from './components/user-information/components/company-details/company-details.component';
import { FactoryDetailsComponent } from './components/user-information/components/factory-details/factory-details.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordOtpComponent } from './components/password-reset/password-otp/password-otp.component';
import { NewPasswordComponent } from './components/password-reset/new-password/new-password.component';

@NgModule({
  declarations: [
    ProfileComponent,
    OrdersHistoryComponent,
    ProfileTitleComponent,
    ImageInputComponent,
    UserInformationComponent,
    DriverDetailsComponent,
    PersonalDetailsComponent,
    CompanyDetailsComponent,
    FactoryDetailsComponent,
    PasswordResetComponent,
    PasswordOtpComponent,
    NewPasswordComponent
  ],
  exports: [ProfileComponent, OrdersHistoryComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxMasonryModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class ProfileModule { }
