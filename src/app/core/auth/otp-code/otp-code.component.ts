import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'naw-otp-code',
  templateUrl: './otp-code.component.html',
  styleUrls: ['./otp-code.component.css']
})
export class OtpCodeComponent implements OnInit {
  user: any | null = null;

  otpForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
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
      this.authService.verifyOtp(formBody).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(['/']);
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
    this.authService.sendOtp(this.user.phone).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/register/otp']);
        this.toastr.success('We have successfully resent a 6-digit OTP code to your registered phone number');
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/']);
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
