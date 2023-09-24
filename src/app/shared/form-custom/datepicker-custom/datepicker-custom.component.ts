import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatepickerCustomService } from './datepicker-custom.service';

@Component({
  selector: 'app-datepicker-custom',
  templateUrl: './datepicker-custom.component.html',
  styleUrls: ['./datepicker-custom.component.scss'],
  providers: [
    DatepickerCustomService
  ]
})
export class DatepickerCustomComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('datepicker', { static: false }) private datepickerEl!: TemplateRef<any>;
  @ViewChild('input', { static: false }) private inputEl!: ElementRef<HTMLInputElement>;
  @Input() control: AbstractControl<any, any> | null;
  @Input() placeholder: string;
  @Input() idDatepicker: string;
  @Input() formatDateLabel: string;
  @Input() regExpDate: RegExp;
  @Input() readOnly: boolean;
  private subs: Subscription;

  constructor(
    private _elementRef: ElementRef,
    public _datepickerCustomService: DatepickerCustomService,
  ) {
    this.control = null;
    this.placeholder = '';
    this.idDatepicker = '';
    this.formatDateLabel = 'dd/MM/yyyy';
    this.regExpDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    this.readOnly = false;
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this._datepickerCustomService.setControl(this.asControl);
    this._datepickerCustomService.setFormatDateLabel(this.formatDateLabel);
    this._datepickerCustomService.setRegExpDate(this.regExpDate);
  }

  ngAfterViewInit(): void {
    const value: string | null = this.control?.value;
    if (this.inputEl?.nativeElement && value) {
      this._datepickerCustomService.setDateEl(value);
    }
    this._datepickerCustomService.setInputEl(this.inputEl);
    if (this.datepickerEl) {
      this._datepickerCustomService.setDatepickerEl(this.datepickerEl)
    }
  }

  @HostListener('document:click', ['$event']) private clickout(event: any): void {
    if (!this._elementRef.nativeElement.contains(event?.target)) {
      const child = document.querySelectorAll(`[select-datepicker-custom]`);
      if (child.length) {
        for (const item of Array.from(child)) {
          document.body.removeChild(item);
        }
      }
    }
  }

  @HostListener('document:scroll', ['$event']) private scrollDocument(event: any): void {
    this._datepickerCustomService.repositionDatepicker();
  }

  @HostListener('window:resize', ['$event']) private resizeDocument(event: any): void {
    this._datepickerCustomService.repositionDatepicker();
  }

  protected get asControl(): FormControl {
    return this.control as FormControl;
  }

  protected get validatorRequired() {
    const validator = this.asControl?.validator?.({} as AbstractControl) || null;
    if (validator && validator['required']) {
      return true;
    } else {
      return false;
    }
  }

  protected toggle(e?: Event): void {
    e?.stopPropagation();
    this._datepickerCustomService.toggle();
  }

  protected setClassLabel(): { '!px-2': boolean, '!text-color-input-field': boolean, '!scale-100': boolean, '!-translate-y-1/2': boolean, '!top-1/2': boolean, '!text-red-600': boolean } {
    return {
      '!px-2': !this.control?.value,
      '!text-color-input-field': this.control?.value,
      '!scale-100': !this.control?.value,
      '!-translate-y-1/2': !this.control?.value,
      '!top-1/2': !this.control?.value,
      '!text-red-600': !!(this.control?.invalid && !this.control.pristine)
    };
  }

  protected getErrorInput(): { '!border-red-600': boolean } {
    return {
      '!border-red-600': !!(this.control?.invalid && !this.control.pristine)
    };
  }

  protected getErrorLabel(): { '!text-red-600': boolean } {
    return {
      '!text-red-600': !!(this.control?.invalid && !this.control.pristine)
    };
  }

  protected setInput(e: any): void {
    this._datepickerCustomService.setInput(e);
  }

  protected onBlur(): void {
    this._datepickerCustomService.controlInputValue();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
