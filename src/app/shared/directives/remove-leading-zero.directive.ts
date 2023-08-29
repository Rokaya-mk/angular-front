import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[nawRemoveLeadingZero]'
})
@HostListener('input', ['$event.target.value'])

export class RemoveLeadingZeroDirective {

  constructor() { }

  onInput(value: string): void {
    // Remove leading zero if present
    if (value && value.charAt(0) === '0') {
      value = value.slice(1);
    }

    // Update the input value with the modified value
    this.setInputValue(value);
  }

  private setInputValue(value: string): void {
    // Use a DOM manipulation method to set the input value
    // Here, we are using the `setAttribute` method to set the value
    const inputElement = document.activeElement as HTMLInputElement;
    inputElement.setAttribute('value', value);
  }
}
