import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({ 
    standalone: true,
    selector: '[scrollbar-custom]' 
})
export class ScrollbarCustomDirective implements OnInit {
    constructor(
        private _el: ElementRef,
        private _renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        this._renderer.addClass(this._el.nativeElement, 'scrollbar-custom');
    }
}