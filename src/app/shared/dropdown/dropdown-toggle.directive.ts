import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";
// SERVICE
import { DropdownService } from "./dropdown.service";

@Directive({
    selector: '[appDropdownToggle]'
})
export class DropdownToggleDirective implements OnInit {

    constructor(
        private _dropdownService: DropdownService,
        private _elementRef: ElementRef
    ) { }

    @HostListener('click', ['$event']) onMouseWheelChrome(event: PointerEvent) {
        event.stopPropagation();
        this._dropdownService.toggle();
    }

    ngOnInit(): void {
        this._dropdownService.setToggleEl(this._elementRef);
    }
}