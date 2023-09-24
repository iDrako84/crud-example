import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatepickerCustomService } from '../../datepicker-custom.service';

@Component({
  selector: 'app-datepicker-custom-month-container-header',
  templateUrl: './datepicker-custom-month-container-header.component.html',
  styleUrls: ['./datepicker-custom-month-container-header.component.scss']
})
export class DatepickerCustomMonthContainerHeaderComponent implements OnInit, OnDestroy {
  protected month: number | null;
  private subs: Subscription;

  constructor(
    public _datepickerCustomService: DatepickerCustomService
  ) {
    this.month = null;
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.subs.add(
      this._datepickerCustomService.getMonth$().subscribe((month) => this.month = month)
    );
  }

  protected onSetYears(e: Event): void {
    e.stopPropagation();
    this._datepickerCustomService.onSetYears();
  }

  protected onChangeMonth(): void {
    this._datepickerCustomService.onChangeMonth(+(this.month as number));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
