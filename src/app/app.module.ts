import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { HomeModule } from './modules/home/home.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CareersModule } from './modules/careers/careers.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { SharedModule } from './shared/shared.module';
import { NewOrderModule } from './modules/order/new-order.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ProfileModule,
    HomeModule,
    CareersModule,
    ArticlesModule,
    SharedModule,
    NewOrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
