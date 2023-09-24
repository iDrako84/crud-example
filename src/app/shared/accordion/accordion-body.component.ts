import { AfterViewInit, Component, ContentChild, ElementRef, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccordionItemService } from './accordion-item.service';

@Component({
    selector: '[app-accordion-body]',
    template: ``
})

export class AccordionBodyComponent implements OnInit, AfterViewInit {
    @ContentChild(TemplateRef) detailRef!: TemplateRef<any>;

    constructor(
        private _vref: ViewContainerRef,
        private _accordionItemService: AccordionItemService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this._accordionItemService.isOpened$.subscribe((isOpened: boolean) => {
            if (isOpened)
                this._vref.createEmbeddedView(this.detailRef);
            else
                this._vref.clear();
        });
    }
}