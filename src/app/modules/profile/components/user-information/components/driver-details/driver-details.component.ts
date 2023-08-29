import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { UserProfileService } from 'src/app/modules/profile/services/user-profile.service';

@Component({
  selector: 'naw-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent {
  @Output() resetPassword = new EventEmitter<void>();

  onResetPassword() {
    this.resetPassword.emit();
  }

  currentUser: any;
  driverDetails: any;

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

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
    this.driverDetails = new FormGroup({
      name: new FormControl(this.currentUser.name || '', [Validators.required]),
      email: new FormControl(this.currentUser.email || '', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}')]),
      phone: new FormControl(this.currentUser.phone || '', [Validators.required]),
      location: new FormControl(this.currentUser.location || '', [Validators.required]),
      longitude: new FormControl(this.currentUser.longitude || ' ', [Validators.required]),
      latitude: new FormControl(this.currentUser.latitude || ' ', [Validators.required]),
      national_id: new FormControl(this.currentUser.national_id || '', [Validators.required]),
      track_type: new FormControl(this.currentUser.track_type || '', [Validators.required]),
      driving_license_number: new FormControl(this.currentUser.driving_license_number || '', [Validators.required]),
      track_license_number: new FormControl(this.currentUser.track_license_number || '', [Validators.required]),
      track_number: new FormControl(this.currentUser.track_number || '', [Validators.required]),
      company_id: new FormControl(this.currentUser.company_id || '', [Validators.required]),
      driving_license_image_f: new FormControl(this.currentUser.driving_license_image_f || ' ', [Validators.required]),
      driving_license_image_b: new FormControl(this.currentUser.driving_license_image_b || ' ', [Validators.required]),
      track_license_image_f: new FormControl(this.currentUser.track_license_image_f || ' ', [Validators.required]),
      track_license_image_b: new FormControl(this.currentUser.track_license_image_b || ' ', [Validators.required]),
      track_image_f: new FormControl(this.currentUser.track_image_f || ' ', [Validators.required]),
      track_image_b: new FormControl(this.currentUser.track_image_b || ' ', [Validators.required]),
      track_image_s: new FormControl(this.currentUser.track_image_s || ' ', [Validators.required]),
      image: new FormControl(this.currentUser.image || '', [Validators.required]),
    });
  }

  submit() {
    const formData = this.driverDetails.getRawValue();
    const detailsBody = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      longitude: formData.longitude,
      latitude: formData.latitude,
      national_id: formData.national_id,
      track_type: formData.track_type,
      driving_license_number: formData.driving_license_number,
      track_license_number: formData.track_license_number,
      track_number: formData.track_number,
      company_id: formData.company_id,
      driving_license_image_f: formData.driving_license_image_f,
      driving_license_image_b: formData.driving_license_image_b,
      track_license_image_f: formData.track_license_image_f,
      track_license_image_b: formData.track_license_image_b,
      track_image_f: formData.track_image_f,
      track_image_b: formData.track_image_b,
      track_image_s: formData.track_image_s
    }

    const imageFile = formData.image;

    if (this.driverDetails.valid && imageFile) {
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      this.profileService.editDriverImages(imageFormData).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.profileService.editDriverDetails(detailsBody).subscribe({
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
      this.driverDetails.markAllAsTouched();
      return;
    }
  }
}
