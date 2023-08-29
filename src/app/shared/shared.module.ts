import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneInputComponent } from './ui/phone-input/phone-input.component';
import { RemoveLeadingZeroDirective } from './directives/remove-leading-zero.directive';



@NgModule({
  declarations: [
    PhoneInputComponent,
    RemoveLeadingZeroDirective
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
