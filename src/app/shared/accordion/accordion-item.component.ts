import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// SERVICES
import { AccordionItemService } from './accordion-item.service';
// RXJS
import { Subscription, switchMap, take } from 'rxjs';

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
        private _accordionItemService: AccordionItemService
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
                .subscribe((isOpened: boolean) => this._accordionItemService.isOpened$.next(!isOpened))
        );
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}