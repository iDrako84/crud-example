import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: '[app-accordion-container]',
    template: `
        <ng-content></ng-content>
    `
})

export class AccordionContainerComponent implements OnInit {
    @Input() autoClose: boolean = false;

    constructor() { }

    ngOnInit(): void {
        
    }
}