import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'naw-reg-driver-info',
  templateUrl: './reg-driver-info.component.html',
  styleUrls: ['./reg-driver-info.component.css']
})
export class RegDriverInfoComponent {
  DriverInfo: FormGroup;
  DriverImages: FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {

    this.DriverInfo = this.builder.group({
      national_id: ['', Validators.required],
      truck_type: ['', Validators.required],
      truck_number: ['', Validators.required],
      track_license_number: ['', Validators.required],
      driving_license_number: ['', Validators.required],
      location: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
    });

    this.DriverImages = this.builder.group({
      profile_image: ['', Validators.required],
      national_id_image_f: ['', Validators.required],
      national_id_image_b: ['', Validators.required],
      truck_image_f: ['', Validators.required],
      truck_image_b: ['', Validators.required],
      truck_image_s: ['', Validators.required],
      track_license_f: ['', Validators.required],
      track_license_b: ['', Validators.required],
      driving_license_f: ['', Validators.required],
      driving_license_b: ['', Validators.required],
    });
  }

  submitDriverDetails() {
    const driverInfo = this.DriverInfo?.getRawValue();
    const driverImages = this.DriverImages?.getRawValue();

    const infoFormBody = {
      national_id: driverInfo.national_id,
      truck_type: driverInfo.truck_type,
      truck_number: driverInfo.truck_number,
      track_license_number: driverInfo.track_license_number,
      driving_license_number: driverInfo.driving_license_number,
      location: driverInfo.location,
      longitude: driverInfo.longitude,
      latitude: driverInfo.latitude,
    }

    const imagesFormBody = {
      profile_image: driverImages.profile_image,
      national_id_image_f: driverImages.national_id_image_f,
      national_id_image_b: driverImages.national_id_image_b,
      truck_image_f: driverImages.truck_image_f,
      truck_image_b: driverImages.truck_image_b,
      truck_image_s: driverImages.truck_image_s,
      track_license_f: driverImages.track_license_f,
      track_license_b: driverImages.track_license_b,
      driving_license_f: driverImages.driving_license_f,
      driving_license_b: driverImages.driving_license_b,
    }

    if (this.DriverInfo.valid && this.DriverImages.valid) {
      this.authService.registerDriverDetails(infoFormBody, imagesFormBody).subscribe({
        next: (response) => {
          this.toastr.success(`Welcome ${response.data.user.name}`, 'Registered Successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          // console.log(error);
          this.toastr.warning('Please enter valid data!')
        }
      });
    } else {
      this.DriverImages.markAllAsTouched();
      return;
    }
  }

  formCurrentStep = 1;
  previousStep() {
    this.formCurrentStep--;
    this.scrollToTop();
  }

  nextStep() {
    if (this.DriverInfo?.valid) {
      this.formCurrentStep++;
    } else {
      this.DriverInfo.markAllAsTouched();
      return;
    }
    this.markAsDone(this.formCurrentStep - 1);
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
