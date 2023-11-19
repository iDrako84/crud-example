import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AccordionContainerService } from './accordion-container.service';
import { Subscription, filter } from 'rxjs';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
    selector: '[app-accordion-container]',
    template: `
        <ng-content></ng-content>
    `,
    providers: [
        AccordionContainerService
    ]
})

export class AccordionContainerComponent implements OnInit, OnDestroy {
    @Input() autoClose: boolean = false;
    private subs = new Subscription();

    constructor(private _accordionContainerService: AccordionContainerService) { }

    ngOnInit(): void {
        this.subs.add(
            this._accordionContainerService.triggerAccordion$
                .pipe(
                    filter(() => !!(this.autoClose))
                )
                .subscribe((res: ElementRef<AccordionItemComponent>) => this._accordionContainerService.closeAccordions$.next(res))
        );
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}