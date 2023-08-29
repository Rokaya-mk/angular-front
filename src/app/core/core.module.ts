import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SignupRoutingModule } from './auth/signup/signup-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RegServiceSeekerComponent } from './auth/signup/components/reg-service-seeker/reg-service-seeker.component';
import { RegServiceProviderComponent } from './auth/signup/components/reg-service-provider/reg-service-provider.component';
import { RegDriverInfoComponent } from './auth/signup/components/reg-service-provider/components/reg-driver-info/reg-driver-info.component';
import { OtpCodeComponent } from './auth/otp-code/otp-code.component';
import { SharedModule } from '../shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-2';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoginComponent, SignupComponent, RegServiceSeekerComponent, RegServiceProviderComponent, RegDriverInfoComponent, OtpCodeComponent],
  exports: [HeaderComponent, FooterComponent, LoginComponent, SignupComponent, RegServiceSeekerComponent, RegServiceProviderComponent, RegDriverInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SignupRoutingModule,
    SharedModule,
    NgxIntlTelInputModule
  ]
})
export class CoreModule { }
