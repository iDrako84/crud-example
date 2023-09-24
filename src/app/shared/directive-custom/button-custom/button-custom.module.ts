import { NgModule } from '@angular/core';
// BUTTONS
import { ButtonPrimaryDirective } from './button-primary.directive';
import { ButtonDangerDirective } from './button-danger.directive';
import { ButtonInfoDirective } from './button-info.directive';
import { ButtonTransparentDirective } from './button-transparent.directive';
import { ButtonWarningDirective } from './button-warning.directive';
import { ButtonLinkDirective } from './button-link.directive';

@NgModule({
  declarations: [
    ButtonDangerDirective,
    ButtonInfoDirective,
    ButtonLinkDirective,
    ButtonPrimaryDirective,
    ButtonTransparentDirective,
    ButtonWarningDirective
  ],
  exports: [
    ButtonDangerDirective,
    ButtonInfoDirective,
    ButtonLinkDirective,
    ButtonPrimaryDirective,
    ButtonTransparentDirective,
    ButtonWarningDirective
  ]
})
export class ButtonCustomModule { }
