import { Directive, Input, OnInit } from "@angular/core";
// SERVICE
import { DropdownService } from "./dropdown.service";

@Directive({
    selector: '[appDropdown]',
    providers: [
        DropdownService
    ],
    exportAs: 'appDropdown'
})
export class DropdownDirective implements OnInit {
    @Input() dropPosition: 'top' | 'bottom' | 'left' | 'right';
    
    constructor(private _dropdownService: DropdownService) { 
        this.dropPosition = "bottom";
    }

    ngOnInit(): void {
        this._dropdownService.setDropPosition(this.dropPosition);
    }

    public open(): void {
        this._dropdownService.open$.next();
    }

    public close(): void {
        this._dropdownService.close$.next();
    }
}