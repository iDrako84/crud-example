import { Component, ElementRef, HostBinding, HostListener } from '@angular/core';
// SERVICES
import { AnimationsService } from '../services/animations.service';
import { AccordionItemService } from './accordion-item.service';

const classList: string[] = [
    'relative',
    'w-full',
    'flex',
    'py-2',
    'px-1',
    'outline-0',
    'overflow-hidden',
    'inline-block',
    'border-0',
    'disabled:cursor-not-allowed',
    'disabled:opacity-60'
];

@Component({
    selector: '[appAccordionToggle]',
    template: `
        <ng-content></ng-content>
        <div class="flex-auto"></div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-transform duration-150" [ngClass]="{'rotate-180': (isOpened$ | async) === true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>  
    `
})
export class AccordionToggleComponent {
    protected isOpened$ = this._accordionItemService.isOpened$;
    private disabled = false;

    constructor(
        private _elementRef: ElementRef,
        private _animationsService: AnimationsService,
        private _accordionItemService: AccordionItemService
    ) { }

    ngOnInit(): void {
        this._elementRef.nativeElement.classList.add(...classList);
    }

    @HostBinding('style') private get setDisabled() {
        return {
            'pointer-events': this.disabled ? 'none' : 'auto'
        }
    };

    @HostListener('click', ['$event']) private onClick(event: any) {
        this._animationsService.animateRipple(event, this._elementRef);
        this._accordionItemService.toggle$.next();
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
        }, this._accordionItemService.animationDuration);
    }
}