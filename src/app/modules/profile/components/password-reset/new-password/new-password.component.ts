import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../../services/user-profile.service';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'naw-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  user: any | null = null;
  code: string | null = null;

  passwordResetForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    CNewPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService) {

    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  submit() {
    const formData = this.passwordResetForm.getRawValue();
    const formBody = {
      code: this.code,
      phone: this.user.phone,
      password: formData.newPassword,
      c_password: formData.CNewPassword
    }

    if (this.passwordResetForm.valid) {
      this.userProfileService.resetPassword(formBody).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(['/']);
            this.toastr.success('Updated successfully!');
          } else {
            this.toastr.error('Please try again later or contact support.', 'Update Failed!');
          }
        },
        error: (err) => {
          console.log('Error occurred:', err);
        }
      });
    } else {
      this.passwordResetForm.markAllAsTouched();
      return;
    }
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.code = params['code'];
    });
  }
}
