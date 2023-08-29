import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'naw-support-section',
  templateUrl: './support-section.component.html',
  styleUrls: ['./support-section.component.css']
})
export class SupportSectionComponent {
  currentUser: any;
  supportMessage: FormGroup;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService) {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.supportMessage = new FormGroup({
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    const formData = this.supportMessage.getRawValue();
    const formBody = {
      user_id: this.currentUser.id,
      title: formData.title,
      message: formData.message
    }

    if (this.supportMessage.valid) {
      this.homeService.sendSupportMessage(formBody).subscribe({
        next: (response) => {
          console.log(response);
          this.supportMessage.reset();
          this.toastr.success('Sent successfully!');
        },
        error: (err) => {
          console.log('Error occurred:', err);
          this.toastr.warning('Error occurred while sending your message', 'Failed!');
        }
      });
    } else {
      this.supportMessage.markAllAsTouched();
      return;
    }
  }
}
