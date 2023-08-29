import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { UserProfileService } from '../../services/user-profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'naw-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent {
  currentUser: any;

  constructor(
    private profileService: UserProfileService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,) {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onResetPassword() {
    this.profileService.sendOtp(this.currentUser.phone).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/profile/password/otp']);
        this.toastr.success('We have sent a 6-digit OTP code to your registered phone number');
      },
      error: (error) => {
        console.log(error);
        // this.router.navigate(['/']);
        this.toastr.warning('Please try again later or contact support.', 'Error occurred!')
      }
    });
  }
}
