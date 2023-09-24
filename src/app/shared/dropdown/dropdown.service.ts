import { ElementRef, Injectable, Renderer2 } from "@angular/core";
// RXJS
import { BehaviorSubject, Subject, forkJoin, take } from "rxjs";

@Injectable()
export class DropdownService {
    private toggle$: Subject<void>;
    private toggleEl$: BehaviorSubject<ElementRef<any> | null>;
    private dropPosition$: BehaviorSubject<'top' | 'bottom' | 'left' | 'right'>;

    constructor() {
        this.toggle$ = new Subject();
        this.toggleEl$ = new BehaviorSubject(null as ElementRef<any> | null);
        this.dropPosition$ = new BehaviorSubject('bottom' as 'top' | 'bottom' | 'left' | 'right');
    }

    public getToggle(): Subject<void> {
        return this.toggle$;
    }

    public toggle(): void {
        this.toggle$.next();
    }

    public getToggleEl$(): BehaviorSubject<ElementRef<any> | null> {
        return this.toggleEl$;
    }

    public setToggleEl(el: ElementRef<any>): void {
        this.toggleEl$.next(el);
    }

    public getDropPosition$(): BehaviorSubject<'top' | 'bottom' | 'left' | 'right'> {
        return this.dropPosition$;
    }

    public setDropPosition(position: 'top' | 'bottom' | 'left' | 'right'): any {
        return this.dropPosition$.next(position);
    }

    public setPositions(_elContainer: ElementRef<any>, _renderer: Renderer2): void {
        forkJoin([
            this.getToggleEl$().pipe(take(1)),
            this.getDropPosition$().pipe(take(1))
        ])
            .subscribe((res: [ElementRef | null, 'top' | 'bottom' | 'left' | 'right']) => {
                if (res[0] && res[1]) {
                    const toggleEl = res[0];
                    const positionToggle = res[1];
                    const positionsToggle: DOMRect = toggleEl.nativeElement.getBoundingClientRect();
                    const positionsContainer: DOMRect = _elContainer.nativeElement.getBoundingClientRect();
                    const windowWidth = window.innerWidth;
                    if (positionToggle === 'bottom') {
                        _renderer.setStyle(_elContainer.nativeElement, 'top', `${positionsToggle.bottom + 2}px`);
                        if (windowWidth < (positionsToggle.left + positionsContainer.width)) {
                            _renderer.setStyle(_elContainer.nativeElement, 'left', `${positionsToggle.right - positionsContainer.width}px`);
                        } else {
                            _renderer.setStyle(_elContainer.nativeElement, 'left', `${positionsToggle.left}px`);
                        }
                    }
                    if (positionToggle === 'top') {
                        _renderer.setStyle(_elContainer.nativeElement, 'top', `${positionsToggle.top - positionsContainer.height - 2}px`);
                        if (windowWidth < (positionsToggle.left + positionsContainer.width)) {
                            _renderer.setStyle(_elContainer.nativeElement, 'left', `${positionsToggle.right - positionsContainer.width}px`);
                        } else {
                            _renderer.setStyle(_elContainer.nativeElement, 'left', `${positionsToggle.left}px`);
                        }
                    }
                    if (positionToggle === 'left') {
                        _renderer.setStyle(_elContainer.nativeElement, 'top', `${positionsToggle.top}px`);
                        _renderer.setStyle(_elContainer.nativeElement, 'left', `${positionsToggle.left - positionsContainer.width - 2}px`);
                    }
                    if (positionToggle === 'right') {
                        _renderer.setStyle(_elContainer.nativeElement, 'top', `${positionsToggle.top}px`);
                        _renderer.setStyle(_elContainer.nativeElement, 'left', `${positionsToggle.left + positionsToggle.width + 2}px`);
                    }
                }
            })
    }
}
