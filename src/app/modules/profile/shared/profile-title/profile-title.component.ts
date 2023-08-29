import { Component, Input } from '@angular/core';

@Component({
  selector: 'naw-profile-title',
  templateUrl: './profile-title.component.html',
  styleUrls: ['./profile-title.component.css']
})
export class ProfileTitleComponent {
  @Input() title = '';
}
