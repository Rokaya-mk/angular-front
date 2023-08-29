import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11y, Mousewheel, Navigation, Pagination, SwiperOptions } from 'swiper';
import { SwiperDirective } from "../../swiper.directive";

@Component({
  selector: 'naw-hero-slider',
  templateUrl: './hero-slider.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    SwiperDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./hero-slider.component.css']
})
export class HeroSliderComponent {
  sliders: string[] = [
    'Test 1',
    'Test 2',
  ]

  config: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 0,
    slidesPerView: 1,
    speed: 800,
    loop: true,
    pagination: {
      clickable: true,
    }
  }
}
