import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { AnimationsService } from '../services/animations.service';

export type ButtonCustomColor = 'primary' | 'warning' | 'danger' | 'info' | 'link' | 'transparent';

@Directive({
    standalone: true,
    selector: '[button-custom]'
})
export class ButtonCustomDirective implements OnInit {
    @Input() set color(value: ButtonCustomColor) {
        this.setClass(value)
    };
    private readonly buttonClasses = {
        primary: 'button-custom-primary',
        warning: 'button-custom-warning',
        danger: 'button-custom-danger',
        info: 'button-custom-info',
        link: 'button-custom-link',
        transparent: 'button-custom-transparent'
    };

    constructor(
        private _el: ElementRef,
        private _renderer: Renderer2,
        private _animationsService: AnimationsService
    ) { }

    ngOnInit(): void {
        this._renderer.addClass(this._el.nativeElement, 'button-custom');
    }

    @HostListener('click', ['$event']) private onClick(event: any) {
        this._animationsService.animateRipple(event, this._el);
    }

    private setClass(c: ButtonCustomColor) {
        for (const key in this.buttonClasses) {
            this._renderer.removeClass(this._el.nativeElement, key);
        }
        this._renderer.addClass(this._el.nativeElement, this.buttonClasses[c]);
    }
}