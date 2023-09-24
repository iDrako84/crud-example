import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AccordionItemService {
    isOpened$: BehaviorSubject<boolean>;
    toggle$: Subject<void>;
    animationDuration = 200;

    constructor() {
        this.isOpened$ = new BehaviorSubject(false);
        this.toggle$ = new Subject();
    }
}