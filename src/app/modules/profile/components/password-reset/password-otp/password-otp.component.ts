import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from '../../../services/user-profile.service';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';

import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'naw-password-otp',
  templateUrl: './password-otp.component.html',
  styleUrls: ['./password-otp.component.css']
})
export class PasswordOtpComponent {
  user: any | null = null;

  otpForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService) {

    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  submit() {
    const formData = this.otpForm.getRawValue();
    const formBody = {
      code: formData.code,
    }

    if (this.otpForm.valid) {
      this.userProfileService.verifyOtp(formBody).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(['/profile/password/reset'], {
              queryParams: { code: formData.code }
            });
            this.toastr.success('Verified successfully!');
          } else {
            this.toastr.error('Please double-check the code and try again.', 'Incorrect OTP Code');
          }
        },
        error: (err) => {
          console.log('Error occurred:', err);
        }
      });
    } else {
      this.otpForm.markAllAsTouched();
      return;
    }
  }

  reSendOtp() {
    this.otpForm.reset()
    this.userProfileService.sendOtp(this.user.phone).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/profile/password/otp']);
        this.toastr.success('We have successfully resent a 6-digit OTP code to your registered phone number');
      },
      error: (error) => {
        console.log(error);
        // this.router.navigate(['/']);
        this.toastr.warning('Error sending OTP code to your phone number. Please try again later or contact support.')
      }
    });
  }

  ngOnInit() {
    if (document.getElementById('countdown')) {
      let oneMinute = parseInt(document.getElementById('countdown')!.innerHTML);
      const countDown = interval(1000)
        .pipe(takeWhile(() => oneMinute > 0))
        .subscribe(() => {
          oneMinute--;
          if (document.getElementById('countdown')) {
            document.getElementById('countdown')!.textContent = oneMinute.toString();
            //do something later when date is reached
            if (oneMinute === 0) {
              document.querySelector('.countdown-statement')!.classList.add('fadeOut');
              document.querySelector('.after-countdown')!.classList.add('fadeIn', 'visible');
              countDown.unsubscribe();
            }
          }
        });
    }
  }
}
