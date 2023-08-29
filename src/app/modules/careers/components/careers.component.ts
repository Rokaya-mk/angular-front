import { Component } from '@angular/core';
import { CareersService } from '../services/careers.service';

@Component({
  selector: 'naw-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent {
  careers: any[] = [];

  constructor(private careerService: CareersService) { }

  ngOnInit(): void {
    this.loadCareers();
  }

  loadCareers(): void {
    this.careerService.getAllCareers().subscribe((response) => {
      this.careers = response.data[0];
      console.log(this.careers);
    });
  }

  getPostedTime(created_at: string): string {
    const now = new Date();
    const createdAt = new Date(created_at);
    const diff = now.getTime() - createdAt.getTime();

    const diffSeconds = Math.floor(diff / 1000);
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

    if (diffSeconds < 60) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return 'More than a month ago';
    }
  }
}
