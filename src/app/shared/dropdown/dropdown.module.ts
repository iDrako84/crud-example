import { NgModule } from '@angular/core';
// DROPDOWN
import { DropdownDirective } from './dropdown.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownContainerDirective } from './dropdown-container.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    DropdownToggleDirective,
    DropdownContainerDirective
  ],
  exports: [
    DropdownDirective,
    DropdownToggleDirective,
    DropdownContainerDirective
  ]
})
export class DropdownModule { }
