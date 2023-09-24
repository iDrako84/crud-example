import { Component } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
// SERVICES
import { AccordionItemService } from './accordion-item.service';
// RXJS
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: '[app-accordion-collapse]',
    template: `
        <div class="overflow-hidden" [@slideInOut]="{value: (isOpened$ | async) === true ? 'in' : 'out', params: {animationDuration: animationDuration}}">
            <ng-content></ng-content>
        </div>
    `,
    animations: [
        trigger('slideInOut', [
            state('in', style({
                height: '*',
            })),
            state('out', style({
                height: '0px',
            })),
            transition('in => out', animate('{{animationDuration}}ms ease-in-out')),
            transition('out => in', animate('{{animationDuration}}ms ease-in-out'))
        ])
    ]
})

export class AccordionCollapseComponent {
    protected isOpened$: BehaviorSubject<boolean>;
    protected animationDuration: number;

    constructor(
        private _accordionItemService: AccordionItemService
    ) {
        this.isOpened$ = this._accordionItemService.isOpened$;
        this.animationDuration = this._accordionItemService.animationDuration
    }
}