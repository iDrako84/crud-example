import { Component } from '@angular/core';
import { DatepickerCustomService } from '../../datepicker-custom.service';

@Component({
  selector: 'app-datepicker-custom-month-container-week',
  templateUrl: './datepicker-custom-month-container-week.component.html',
  styleUrls: ['./datepicker-custom-month-container-week.component.scss']
})
export class DatepickerCustomMonthContainerWeekComponent {

  constructor(
    public _datepickerCustomService: DatepickerCustomService
  ) { }

  protected controlSelectedDay(dayItem: { day: number, month: number, year: number }): boolean {
    if (!this._datepickerCustomService.getControl().value) {
      return false;
    } else {
      const date = new Date(this._datepickerCustomService.getControl().value);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return (year === dayItem.year && month === dayItem.month && day === dayItem.day);
    }
  }

  protected setDate(e: Event, dayItem: { day: number, month: number, year: number }): void {
    e.stopPropagation();
    this._datepickerCustomService.setDateDay(dayItem)
  }

  protected toggle(e?: Event): void {
    e?.stopPropagation();
    this._datepickerCustomService.toggle();
  }

  ngOnDestroy(): void {
  }
}
