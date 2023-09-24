import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// COMPONENTS
import { DatepickerCustomComponent } from './datepicker-custom.component';
import { DatepickerCustomMonthContainerComponent } from './datepicker-custom-month-container/datepicker-custom-month-container.component';
import { DatepickerCustomMonthContainerHeaderComponent } from './datepicker-custom-month-container/datepicker-custom-month-container-header/datepicker-custom-month-container-header.component';
import { DatepickerCustomMonthContainerWeekComponent } from './datepicker-custom-month-container/datepicker-custom-month-container-week/datepicker-custom-month-container-week.component';
import { DatepickerCustomYearContainerComponent } from './datepicker-custom-year-container/datepicker-custom-year-container.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        DatepickerCustomComponent
    ],
    declarations: [
        DatepickerCustomComponent,
        DatepickerCustomMonthContainerComponent,
        DatepickerCustomMonthContainerHeaderComponent,
        DatepickerCustomMonthContainerWeekComponent,
        DatepickerCustomYearContainerComponent
    ],
    providers: [],
})
export class DatepickerCustomModule { }
