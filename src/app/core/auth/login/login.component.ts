import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input-2';
@Component({
  selector: 'naw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  countryCode = '+20';

  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.SaudiArabia,
    CountryISO.Jordan,
    CountryISO.Palestine,
    CountryISO.Libya,
    CountryISO.Morocco,
    CountryISO.UnitedArabEmirates,
    CountryISO.Qatar,
    CountryISO.Algeria,
    CountryISO.Bahrain,
  ];

  loginForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  submit() {
    const formData:any = this.loginForm.getRawValue();
    const formBody = {
      phone: formData.phone.e164Number,
      // phone: this.countryCode + formData.phone,
      password: formData.password,
    }

    if (this.loginForm.valid) {
      // console.log(formBody);
      // console.log('Valid');
      this.authService.login(formBody).subscribe({
        next: (response) => {
          // console.log(response);
          this.toastr.success(`Hello ${response.data.user.name}`, 'Logged in successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          // console.log('Error occurred:', err);
          if (err.error.data === 'Validation Error.') {
            if (err && err.error && err.error.message[0] === 'Password is Incorrect') {
              this.toastr.error('Password is incorrect. Please try again.', 'Validation Error');
            } else {
              this.toastr.error('Incorrect Login Details, Please try again.', 'Validation Error');
            }
          } else {
            this.toastr.error('An error occurred. Please try again later.', 'Error');
          }
        }
      });
    } else {
      // console.log(this.loginForm.get('phone'));
      // console.log('Invalid');
      this.loginForm.markAllAsTouched();
      return;
    }
  }
}
