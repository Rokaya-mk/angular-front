import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CareersComponent } from './components/careers.component';

@NgModule({
  declarations: [
    CareersComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CareersComponent]
})
export class CareersModule { }
