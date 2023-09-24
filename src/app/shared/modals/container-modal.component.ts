import { trigger, transition, style, animate, keyframes } from "@angular/animations";
import { Component, ComponentRef, ElementRef, HostListener, Input } from "@angular/core";
import { Observable, Subject } from "rxjs";

const classList: string[] = [
    'fixed',
    'left-0',
    'top-0',
    'w-full',
    'h-screen',
    'bg-black/75',
    'z-[45]'
];

@Component({
    selector: '.container-modal',
    template: `
        <div class="modal-content min-w-min max-w-xs min-h-[1px] m-auto mt-4" (click)="$event.stopPropagation()" @openModal>
        </div>
    `,
    animations: [
        trigger('openModal', [
            transition(':enter', [
                style({ position: 'relative', top: 0, opacity: 1 }),
                animate('0.3s ease-in-out',
                    keyframes([
                        style({
                            top: '-10px',
                            opacity: 0
                        }),
                        style({
                            top: 0,
                            opacity: 1
                        })
                    ])
                )
            ])
        ])
    ]
})
export class ContainerModalComponent {
    @Input() id: string | null;
    @Input() instance!: { id: string, componentRef: ComponentRef<any>, subjectClose: Subject<void>, close: Subject<void>, obsClose: Observable<any> };

    constructor(
        private _elementRef: ElementRef
    ) {
        this._elementRef.nativeElement.classList.add(...classList);
        this.id = null;
    }

    @HostListener('click', ['$event']) click(event: any) {
        this.instance.subjectClose.next();
    }

}
