import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { UserProfileService } from 'src/app/modules/profile/services/user-profile.service';

@Component({
  selector: 'naw-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  @Output() resetPassword = new EventEmitter<void>();

  onResetPassword() {
    this.resetPassword.emit();
  }

  currentUser: any;
  personalDetails: any;

  constructor(
    private profileService: UserProfileService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService) {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.personalDetails = new FormGroup({
      name: new FormControl(this.currentUser.name || '', [Validators.required]),
      email: new FormControl(this.currentUser.email || '', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}')]),
      phone: new FormControl(this.currentUser.phone || '', [Validators.required]),
      image: new FormControl(this.currentUser.image || '', [Validators.required]),
    });
    // this.personalDetails.valueChanges.subscribe((val: any) => console.log(val))
  }

  submit() {
    const formData = this.personalDetails.getRawValue();
    const detailsBody = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    const imageFile = formData.image;

    if (this.personalDetails.valid && imageFile) {
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      this.profileService.editCustomerImage(imageFormData).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.profileService.editCustomerDetails(detailsBody).subscribe({
              next: (response) => {
                console.log(response);
                this.toastr.success('Updated successfully!');
              },
              error: (err) => {
                console.log('Error occurred:', err);
                this.toastr.warning('Error occurred while updating your information', 'Update failed!');
              }
            });
          } else {
            this.toastr.error('Please double-check and try again later.', 'Incorrect information');
          }
        },
        error: (err) => {
          console.log('Error occurred:', err);
          this.toastr.warning('Error occurred while updating your image', 'Update failed!');
        }
      });
    } else {
      this.personalDetails.markAllAsTouched();
      return;
    }
  }
}
