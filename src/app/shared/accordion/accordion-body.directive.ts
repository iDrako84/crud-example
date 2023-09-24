import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
// SERVICES
import { AccordionItemService } from './accordion-item.service';

@Directive({ selector: '[appAccordionBody]' })
export class AccordionBodyDirective implements OnInit {
    constructor(
        private _vref: ViewContainerRef,
        private _accordionItemService: AccordionItemService,
        private _templateRef: TemplateRef<any>
    ) { }

    ngOnInit(): void {
        this._accordionItemService.isOpened$.subscribe((isOpened: boolean) => {
            isOpened ?
                this._vref.createEmbeddedView(this._templateRef) :
                setTimeout(() => this._vref.clear(), this._accordionItemService.animationDuration);
        });
    }
}