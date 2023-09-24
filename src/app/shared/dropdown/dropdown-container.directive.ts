import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from "@angular/core";
// SERVICE
import { DropdownService } from "./dropdown.service";
// RXJS
import { BehaviorSubject, Subscription, forkJoin, take } from "rxjs";

@Directive({
    selector: '[appDropdownContainer]'
})
export class DropdownContainerDirective implements OnInit, OnDestroy {
    private subs: Subscription;

    constructor(
        private _dropdownService: DropdownService,
        private _elementRef: ElementRef,
        private _renderer: Renderer2
    ) {
        this.subs = new Subscription();
    }

    @HostListener('document:click', ['$event']) private clickout(event: any): void {
        if (!this._elementRef.nativeElement.contains(event?.target)) {
            this._renderer.addClass(this._elementRef.nativeElement, 'hidden');
        }
    }

    @HostListener('document:scroll', ['$event']) private scrollDocument(event: any): void {
        if (!this._elementRef.nativeElement.classList.contains('hidden')) {
            this._dropdownService.setPositions(this._elementRef, this._renderer);
        }
    }

    @HostListener('window:resize', ['$event']) private resizeDocument(event: any): void {
        if (!this._elementRef.nativeElement.classList.contains('hidden')) {
            this._dropdownService.setPositions(this._elementRef, this._renderer);
        }
    }

    ngOnInit(): void {
        this._renderer.addClass(this._elementRef.nativeElement, 'fixed');
        this._renderer.addClass(this._elementRef.nativeElement, 'hidden');
        this._renderer.addClass(this._elementRef.nativeElement, 'z-10');
        this.subs.add(
            this._dropdownService.getToggle().subscribe(() => this.showHiddenDropdown())
        );
    }

    private showHiddenDropdown(): void {
        if (this._elementRef.nativeElement.classList.contains('hidden')) {
            this._renderer.removeClass(this._elementRef.nativeElement, 'hidden');
            this._dropdownService.setPositions(this._elementRef, this._renderer);
        } else {
            this._renderer.addClass(this._elementRef.nativeElement, 'hidden');
        }
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}