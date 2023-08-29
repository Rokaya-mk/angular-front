import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { UserProfileService } from 'src/app/modules/profile/services/user-profile.service';

@Component({
  selector: 'naw-factory-details',
  templateUrl: './factory-details.component.html',
  styleUrls: ['./factory-details.component.css']
})
export class FactoryDetailsComponent {
  @Output() resetPassword = new EventEmitter<void>();

  onResetPassword() {
    this.resetPassword.emit();
  }

  currentUser: any;
  factoryDetails: any;

  files: File[] = [];

  constructor(
    private profileService: UserProfileService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService) {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit() {
    this.factoryDetails = new FormGroup({
      name: new FormControl(this.currentUser.name || '', [Validators.required]),
      email: new FormControl(this.currentUser.email || '', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}')]),
      phone: new FormControl(this.currentUser.phone || '', [Validators.required]),
      commercial_record: new FormControl(this.currentUser.commercial_record || '', [Validators.required]),
      tax_card: new FormControl(this.currentUser.tax_card || '', [Validators.required]),
      location: new FormControl(this.currentUser.location || '', [Validators.required]),
      longitude: new FormControl(this.currentUser.longitude || '123456', [Validators.required]),
      latitude: new FormControl(this.currentUser.latitude || '123456', [Validators.required]),
      image: new FormControl(this.currentUser.image || '', [Validators.required]),
    });
  }

  submit() {
    const formData = this.factoryDetails.getRawValue();
    const detailsBody = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      commercial_record: formData.commercial_record,
      tax_card: formData.tax_card,
      location: formData.location,
      longitude: formData.longitude,
      latitude: formData.latitude
    }

    const imageFile = formData.image;

    if (this.factoryDetails.valid && imageFile) {
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      this.profileService.editFactoryImages(imageFormData).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.profileService.editFactoryDetails(detailsBody).subscribe({
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
      this.factoryDetails.markAllAsTouched();
      return;
    }
  }
}
