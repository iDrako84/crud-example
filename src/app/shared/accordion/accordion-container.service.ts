import { ElementRef, Injectable } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';
import { Subject } from 'rxjs';

@Injectable()
export class AccordionContainerService {
    triggerAccordion$ = new Subject<ElementRef<AccordionItemComponent>>();
    closeAccordions$ = new Subject<ElementRef<AccordionItemComponent>>();

    constructor() { }
}