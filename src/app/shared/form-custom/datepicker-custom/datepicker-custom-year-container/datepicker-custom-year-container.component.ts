import { Component } from '@angular/core';
import { DatepickerCustomService } from '../datepicker-custom.service';

@Component({
  selector: 'app-datepicker-custom-year-container',
  templateUrl: './datepicker-custom-year-container.component.html',
  styleUrls: ['./datepicker-custom-year-container.component.scss']
})
export class DatepickerCustomYearContainerComponent {

  constructor(
    public _datepickerCustomService: DatepickerCustomService,
  ) {}

  public setArrYears(e: Event, arrow: 0 | 1): void {
    e.stopPropagation();
    this._datepickerCustomService.setArrYears(arrow);
  }

  public onSetYear(e: Event, year: number): void {
    e.stopPropagation();
    this._datepickerCustomService.onSetYear(year);
  }
}
