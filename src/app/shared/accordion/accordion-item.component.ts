import { Component, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
// SERVICES
import { AccordionItemService } from './accordion-item.service';
// RXJS
import { Subscription, switchMap, take } from 'rxjs';
import { AccordionContainerService } from './accordion-container.service';

@Component({
    selector: '[app-accordion-item]',
    template: `
        <ng-content select="[appAccordionToggle]"></ng-content>
        <ng-content></ng-content>
    `,
    providers: [
        AccordionItemService
    ]
})

export class AccordionItemComponent implements OnInit, OnDestroy {
    @Input() open: boolean;
    private subs: Subscription;

    constructor(
        private _accordionItemService: AccordionItemService,
        private _accordionContainerService: AccordionContainerService,
        private _el: ElementRef
    ) {
        this.open = false;
        this.subs = new Subscription();
    }

    ngOnInit() {
        this._accordionItemService.isOpened$.next(this.open);
        this.subs.add(
            this._accordionItemService.toggle$
                .pipe(
                    switchMap(() => this._accordionItemService.isOpened$.pipe(take(1)))
                )
                .subscribe((isOpened: boolean) => {
                    this._accordionItemService.isOpened$.next(!isOpened);
                    this._accordionContainerService.triggerAccordion$.next(this._el.nativeElement);
                })
        );
        this.subs.add(
            this._accordionContainerService.closeAccordions$
                .subscribe((el: ElementRef<AccordionItemComponent>) => {
                    if (el !== this._el.nativeElement) {
                        this._accordionItemService.isOpened$.next(false);
                    }
                })
        );
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}