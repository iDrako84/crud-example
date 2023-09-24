import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ACCORDION
import { AccordionContainerComponent } from './accordion-container.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionToggleComponent } from './accordion-toggle.component';
import { AccordionCollapseComponent } from './accordion-collapse.component';
import { AccordionBodyDirective } from './accordion-body.directive';

@NgModule({
  declarations: [
    AccordionContainerComponent,
    AccordionItemComponent,
    AccordionCollapseComponent,
    AccordionBodyDirective,
    AccordionToggleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccordionContainerComponent,
    AccordionItemComponent,
    AccordionCollapseComponent,
    AccordionBodyDirective,
    AccordionToggleComponent
  ]
})
export class AccordionModule { }
