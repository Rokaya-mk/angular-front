import { Component, OnInit } from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'naw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nawloan';

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.initializeScrollToTop();
  }
}
