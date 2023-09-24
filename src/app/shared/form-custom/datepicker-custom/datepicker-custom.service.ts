import { ElementRef, Inject, Injectable, LOCALE_ID, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";
import { formatDate } from '@angular/common';
import { FormControl } from "@angular/forms";
import { MakeIdService } from "../../services/make-id.service";
import { BehaviorSubject, Observable, map, switchMap, take, zip } from "rxjs";

@Injectable()
export class DatepickerCustomService {
    private mode$: BehaviorSubject<'month' | 'year'>;
    private day$: BehaviorSubject<number>;
    private month$: BehaviorSubject<number>;
    private year$: BehaviorSubject<number>;
    private months$: BehaviorSubject<string[]>;
    private years$: BehaviorSubject<number[]>;
    private datepickerData$: BehaviorSubject<{ day: number, month: number, year: number }[][]>;
    private weeks$: BehaviorSubject<string[]>;
    private control: FormControl;
    private inputEl$: BehaviorSubject<ElementRef<HTMLInputElement> | null>;
    private datepickerEl$: BehaviorSubject<TemplateRef<any> | null>;
    private formatDateLabel$: BehaviorSubject<string>;
    private regExpDate$: BehaviorSubject<RegExp>;
    public idContainer: string;

    constructor(
        @Inject(LOCALE_ID) private locale: string,
        private _viewContainerRef: ViewContainerRef,
        private _renderer: Renderer2,
        private _makeIdService: MakeIdService
    ) {
        this.mode$ = new BehaviorSubject('month' as 'month' | 'year');
        this.day$ = new BehaviorSubject(0);
        this.month$ = new BehaviorSubject(0);
        this.year$ = new BehaviorSubject(0);
        this.months$ = new BehaviorSubject(
            [
                'Gennaio',
                'Febbraio',
                'Marzo',
                'Aprile',
                'Maggio',
                'Giugno',
                'Luglio',
                'Agosto',
                'Settembre',
                'Ottobre',
                'Novembre',
                'Dicembre',
            ]
        );
        this.years$ = new BehaviorSubject([] as number[]);
        this.datepickerData$ = new BehaviorSubject([[{ year: 0, month: 0, day: 0 }]]);
        this.weeks$ = new BehaviorSubject(
            [
                'Lun',
                'Mar',
                'Mer',
                'Gio',
                'Ven',
                'Sab',
                'Dom',
            ]
        );
        this.control = new FormControl(null);
        this.inputEl$ = new BehaviorSubject(null as ElementRef<HTMLInputElement> | null);
        this.datepickerEl$ = new BehaviorSubject(null as TemplateRef<any> | null);
        this.formatDateLabel$ = new BehaviorSubject('dd/MM/yyyy');
        this.regExpDate$ = new BehaviorSubject(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
        this.idContainer = this._makeIdService.onGetId(12);
    }

    public getMode$(): BehaviorSubject<'month' | 'year'> {
        return this.mode$;
    }

    public setMode(mode: 'month' | 'year'): void {
        this.mode$.next(mode);
    }

    public getDay$(): BehaviorSubject<number> {
        return this.day$;
    }

    public setDay(day: number): void {
        this.day$.next(day);
    }

    public getMonth$(): BehaviorSubject<number> {
        return this.month$;
    }

    public setMonth(month: number): void {
        this.month$.next(month);
    }

    public getYear$(): BehaviorSubject<number> {
        return this.year$;
    }

    public setYear(year: number): void {
        this.year$.next(year);
    }

    public getMonths$(): BehaviorSubject<string[]> {
        return this.months$;
    }

    public setMonths(months: string[]): void {
        this.months$.next(months);
    }

    public getYears$(): BehaviorSubject<number[]> {
        return this.years$;
    }

    public setYears(years: number[]): void {
        this.years$.next(years);
    }

    public getDatepickerData$(): BehaviorSubject<{ day: number, month: number, year: number }[][]> {
        return this.datepickerData$;
    }

    public setDatepickerData(datepickerData: { day: number, month: number, year: number }[][]): void {
        this.datepickerData$.next(datepickerData);
    }

    public getWeeks$(): BehaviorSubject<string[]> {
        return this.weeks$;
    }

    public setWeeks$(weeks: string[]): void {
        this.weeks$.next(weeks);
    }

    public getControl(): FormControl {
        return this.control;
    }

    public setControl(control: FormControl): void {
        this.control = control;
    }

    public getInputEl$(): BehaviorSubject<ElementRef<HTMLInputElement> | null> {
        return this.inputEl$;
    }

    public setInputEl(inputEl: ElementRef<HTMLInputElement>): void {
        this.inputEl$.next(inputEl);
    }

    public getDatepickerEl$(): BehaviorSubject<TemplateRef<any> | null> {
        return this.datepickerEl$;
    }

    public setDatepickerEl(datepickerEl: TemplateRef<any>): void {
        this.datepickerEl$.next(datepickerEl);
    }

    public getFormatDateLabel$(): BehaviorSubject<string> {
        return this.formatDateLabel$;
    }

    public setFormatDateLabel(formatDateLabel: string): void {
        this.formatDateLabel$.next(formatDateLabel);
    }

    public getRegExpDate$(): BehaviorSubject<RegExp> {
        return this.regExpDate$;
    }

    public setRegExpDate(regExpDate: RegExp): void {
        this.regExpDate$.next(regExpDate);
    }

    public onSetYears(): void {
        this.getYear$()
            .pipe(
                take(1)
            )
            .subscribe((year: number | null) => {
                const years = [];
                year = year as number;
                years.push(year);
                years.push(year + 1);
                years.push(year + 2);
                years.push(year + 3);
                years.push(year + 4);
                years.unshift(year - 1);
                years.unshift(year - 2);
                years.unshift(year - 3);
                years.unshift(year - 4);
                this.setYears(years);
                this.setMode('year')
            });
    }

    private createArr(): Observable<{ day: number, month: number, year: number }[][]> {
        return zip(
            this.getYear$().pipe(take(1)),
            this.getMonth$().pipe(take(1)),
        )
            .pipe(
                map((res: [number, number]) => {
                    let i = 0;
                    let day;
                    let arr: { day: number, month: number, year: number }[][] = [
                        []
                    ];
                    do {
                        i++;
                        day = new Date(res[0], res[1]).setDate(i);
                        if (new Date(day).getMonth() === res[1]) {
                            if (new Date(day).getDay() !== 1) {
                                arr[arr.length - 1].push({ day: i, month: res[1], year: new Date(day).getFullYear() });
                            } else {
                                arr.push([]);
                                arr[arr.length - 1].push({ day: i, month: res[1], year: new Date(day).getFullYear() });
                            }
                        }
                    } while (res[1] === new Date(day).getMonth());
                    if (arr[0].length < 7) {
                        const item = new Date(res[0], res[1]).setDate(0);
                        let lastDay = new Date(item).getDate();
                        for (let n = new Date(item).getDay(); arr[0].length < 7; n--) {
                            arr[0].unshift({ day: lastDay, month: (res[1] - 1) === -1 ? 11 : (res[1] - 1), year: new Date(item).getFullYear() });
                            lastDay--;
                        }
                    }
                    if (arr[arr.length - 1].length < 7) {
                        const week = arr[arr.length - 1];
                        const lastDay = week[week.length - 1].day;
                        const month = new Date(res[0], res[1]).setDate(lastDay);

                        for (let n = 1; arr[arr.length - 1].length < 7; n++) {
                            arr[arr.length - 1].push({ day: n, month: res[1] + 1, year: new Date(month).getFullYear() });
                        }
                    }
                    return arr;
                })
            )
    }

    public onChangeMonth(month: number): void {
        this.setMonth(month);
        this.createArr().subscribe((res: { day: number, month: number, year: number }[][]) => {
            this.setDatepickerData(res);
        });
    }

    public toggle(): void {
        const child = document.querySelectorAll('[select-datepicker-custom]');
        this.getInputEl$().subscribe((inputEl) => {
            if (inputEl) {
                const position = inputEl.nativeElement.getBoundingClientRect();

                if (child.length) {
                    for (const item of Array.from(child)) {
                        document.body.removeChild(item);
                    }
                } else {
                    this.setDatepickerOpen();
                    this.getDatepickerEl$()
                        .pipe(
                            take(1)
                        )
                        .subscribe((res) => {
                            if (res) {
                                const embeddedViewRef = this._viewContainerRef.createEmbeddedView(res);
                                embeddedViewRef.detectChanges();
                                const innerHeight = window.innerHeight;
                                for (const node of embeddedViewRef.rootNodes) {
                                    const ell = node.querySelector(`[select-datepicker-custom-item="${this.idContainer}"]`);
                                    if (innerHeight < (position.bottom + ell.offsetHeight)) {
                                        this._renderer.setStyle(ell, 'top', `${position.top - ell.offsetHeight - 2}px`);
                                    } else {
                                        this._renderer.setStyle(ell, 'top', `${position.bottom + 2}px`);
                                    }
                                    this._renderer.setStyle(ell, 'left', `${position.left}px`);
                                    document.body.appendChild(node);
                                }
                            }
                        })
                }
            }
        });
    }

    private setDatepickerOpen(): void {
        const value = this.getControl()?.value;
        if (value) {
            this.setMode('month');
            this.setYear(new Date(value).getFullYear());
            this.setMonth(new Date(value).getMonth());
            this.setDay(new Date(value).getDate());
            this.createArr().subscribe((res) => this.setDatepickerData(res));
        } else {
            this.getInputEl$().subscribe((res) => {
                if (res) {
                    res.nativeElement.value = ''
                }
            })
        }
    }

    public setArrYears(arrow: 0 | 1): void {
        this.getYears$()
            .pipe(
                take(1)
            )
            .subscribe((y) => {
                const years = y.slice();
                const newYears = []
                if (arrow) {
                    for (let i = 1; i <= 9; i++) {
                        newYears.push(years[years.length - 1] + i);
                    }
                } else {
                    for (let i = 1; i <= 9; i++) {
                        newYears.unshift(years[0] - i);
                    }
                }
                this.setYears(newYears);
            })
    }

    public onSetYear(year: number): void {
        this.setYear(year);
        this.setMonth(0);
        this.createArr().subscribe((res) => this.setDatepickerData(res));
        this.setMode('month');
    }

    public setDateEl(d: string): void {
        const date = new Date(d);
        this.getInputEl$().pipe(take(1))

            .subscribe((res) => {
                if (res) {
                    formatDate(new Date(date), 'yyyy-MM-dd', this.locale);
                    res.nativeElement.value = formatDate(new Date(date), 'yyyy-MM-dd', this.locale);
                }
            });
    }

    public repositionDatepicker(): void {
        this.getInputEl$()
            .pipe(
                take(1)
            )
            .subscribe((res) => {
                if (res) {
                    const childs = document.querySelectorAll('[select-datepicker-custom]');
                    const child = document.querySelector(`[select-datepicker-custom-item="${this.idContainer}"]`);
                    const listPosition = child?.getBoundingClientRect();
                    const innerHeight = window.innerHeight;
                    const inputElPosition = res.nativeElement.getBoundingClientRect();
                    if (child && listPosition && (inputElPosition.top > 0 && inputElPosition.top < innerHeight)) {
                        if (innerHeight < (inputElPosition.bottom + listPosition.height)) {
                            this._renderer.setStyle(child, 'top', `${inputElPosition.top - listPosition.height - 2}px`);
                        } else {
                            this._renderer.setStyle(child, 'top', `${inputElPosition.bottom + 2}px`);
                        }
                        this._renderer.setStyle(child, 'left', `${inputElPosition.left}px`);
                    } else {
                        for (const item of Array.from(childs)) {
                            document.body.removeChild(item);
                        }
                    }
                }
            });
    }

    public setInput(e: any): void {
        if (typeof e.target.value === 'string') {
            this.getRegExpDate$()
                .pipe(
                    take(1)
                )
                .subscribe((re: RegExp) => {
                    const test = re.test(e.target.value);
                    if (test) {
                        const split = e.target.value.split('/');
                        this.control.setValue(formatDate(new Date(+split[2], +split[1] - 1, +split[0]), 'yyyy-MM-dd', this.locale));
                    }
                });
        }
    }

    public getValueInputEl(): Observable<string> {
        return this.getFormatDateLabel$()
            .pipe(
                take(1),
                map((res) => {
                    if (typeof this.control.value === 'string') {
                        const re = /^\d{4}-\d{2}-\d{2}$/;
                        const test = re.test(this.control.value);
                        if (test) {
                            return formatDate(this.control.value, res, this.locale);
                        } else {
                            return this.control.value;
                        }
                    } else {
                        return ''
                    }
                })
            );
    }

    public controlInputValue(): void {
        zip(
            this.getInputEl$().pipe(take(1)),
            this.getRegExpDate$().pipe(take(1))
        )

            .subscribe((res: [ElementRef<HTMLInputElement> | null, RegExp]) => {
                if (res[0]) {
                    if (res[0].nativeElement.value) {
                        const test = res[1].test(res[0].nativeElement.value);
                        if (!test) {
                            this.control.setValue(null);
                        }
                    } else {
                        this.control.setValue(null);
                    }
                }
            })
    }

    public setDateDay(dayItem: { day: number, month: number, year: number }): void {
        this.getControl()?.setValue(formatDate(new Date(dayItem.year, dayItem.month, dayItem.day), 'yyyy-MM-dd', this.locale));
        this.getInputEl$().pipe(take(1))
            .subscribe((res: ElementRef<HTMLInputElement> | null) => {
                if (res) {
                    res.nativeElement.value = formatDate(new Date(dayItem.year, dayItem.month, dayItem.day), 'yyyy-MM-dd', this.locale);
                    this.toggle();
                }
            });
    }
}
