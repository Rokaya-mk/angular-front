import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input-2';

@Component({
  selector: 'naw-reg-service-provider',
  templateUrl: './reg-service-provider.component.html',
  styleUrls: ['./reg-service-provider.component.css']
})
export class RegServiceProviderComponent {
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

  countryCode = '+20';
  user: any | null = null;

  DriverSignupForm: FormGroup;

  companySignupForm: FormGroup;
  companySignupStepOne: FormGroup;
  companySignupStepTwo: FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {

    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });

    this.DriverSignupForm = this.builder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordsMatchValidator('password', 'confirmPassword')
    });

    this.companySignupStepOne = this.builder.group({
      companyName: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      commercialRecord: ['', Validators.required],
      companyTaxCard: ['', Validators.required],
      companyLocation: '',
    }, {
      validator: this.passwordsMatchValidator('password', 'confirmPassword')
    });

    this.companySignupStepTwo = this.builder.group({
      bankName: '',
      branchName: '',
      accountHoldersName: '',
      bankAccountNumber: '',
      swiftCode: '',
      iban: '',
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.companySignupForm = this.builder.group({
      step1: this.companySignupStepOne,
      step2: this.companySignupStepTwo
    });
  }

  passwordsMatchValidator(controlName: string, matchingControlName: string): ValidationErrors {
    return (group: FormGroup): ValidationErrors | null => {
      const control = group.controls[controlName];
      const matchingControl = group.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['passwordsMatch']) {
        return null;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordsMatch: true });
        return { passwordsMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  onDriverSignupSubmit() {
    const formData:any = this.DriverSignupForm?.getRawValue();
    const formBody = {
      name: formData.name,
      // phone: this.countryCode + formData.phone,
      phone: formData.phone.e164Number,
      email: formData.email,
      password: formData.password,
      c_password: formData.confirmPassword,
      // acceptTerms: formData.acceptTerms,
    }

    if (this.DriverSignupForm.valid) {
      this.authService.signupDriver(formBody).subscribe({
        next: (response) => {
          this.authService.sendOtp(this.user.phone).subscribe({
            next: (response) => {
              console.log(response);
              this.router.navigate(['/register/otp']);
              this.toastr.success('We have successfully sent a 6-digit OTP code to your registered phone number', 'Registered Successfully');
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
              this.toastr.warning('Error sending OTP code to your phone number. Please try again later or contact support.', 'Registered Successfully')
            }
          });
        },
        error: (error) => {
          // console.log(error);
          this.toastr.warning('Please enter valid data!')
        }
      });
    } else {
      this.DriverSignupForm.markAllAsTouched();
      return;
    }
  }

  onCompanySignupSubmit() {
    const formData1:any = this.companySignupStepOne?.getRawValue();
    const formData2 = this.companySignupStepTwo?.getRawValue();
    const formBody = {
      name: formData1.companyName,
      // phone: this.countryCode + formData1.phone,
      phone: formData1.phone.e164Number,
      email: formData1.email,
      password: formData1.password,
      c_password: formData1.confirmPassword,
      commercial_record: formData1.commercialRecord,
      tax_card: formData1.companyTaxCard,
      location: formData1.companyLocation,

      bank_name: formData2.bankName,
      branch_name: formData2.branchName,
      account_holder_name: formData2.accountHoldersName,
      account_number: formData2.bankAccountNumber,
      soft_code: formData2.swiftCode,
      iban: formData2.iban,
      // acceptTerms: formData2.acceptTerms,
    }

    if (this.companySignupForm.valid) {
      this.authService.signupCompany(formBody).subscribe({
        next: (response) => {
          this.authService.sendOtp(this.user.phone).subscribe({
            next: (response) => {
              console.log(response);
              this.router.navigate(['/register/otp']);
              this.toastr.success('We have successfully sent a 6-digit OTP code to your registered phone number', 'Registered Successfully');
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
              this.toastr.warning('Error sending OTP code to your phone number. Please try again later or contact support.', 'Registered Successfully')
            }
          });
        },
        error: (error) => {
          // console.log(error);
          this.toastr.warning('Please enter valid data!')
        }
      });
    } else {
      this.companySignupForm.markAllAsTouched();
      return;
    }
  }

  companyCurrentStep = 1;

  previousStep() {
    this.companyCurrentStep--;
    this.scrollToTop();
  }

  nextStep() {
    if (this.companySignupForm.get('step1')?.valid) {
      this.companyCurrentStep++;
    } else {
      this.companySignupForm.get('step1')?.markAllAsTouched();
      return;
    }
    this.markAsDone(this.companyCurrentStep - 1);
    this.scrollToTop();
  }

  markAsDone(index: number) {
    const link = document.getElementById(`step-${index}`);
    link?.classList.add('done');
  }

  scrollToTop() {
    const formWizard = document.querySelector('.form-wizard') as HTMLElement;
    formWizard.scrollTop = 0;
  }
}
