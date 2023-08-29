import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticlesRoutingModule } from '../articles/articles-routing.module';
import { HomeComponent } from './components/home.component';
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from './swiper.directive';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { SupportSectionComponent } from './components/support-section/support-section.component';
import { ArticlesSectionComponent } from './components/articles-section/articles-section.component';

register();
@NgModule({
  declarations: [
    HomeComponent,
    SupportSectionComponent,
    ArticlesSectionComponent,
    // SwiperDirective
  ],
  exports: [HomeComponent],
  imports: [
    HeroSliderComponent,
    CommonModule,
    ReactiveFormsModule,
    ArticlesRoutingModule
  ]
})
export class HomeModule { }
