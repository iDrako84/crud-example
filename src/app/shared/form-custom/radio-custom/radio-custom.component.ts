import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ReactiveFormsModule
  ],
  selector: 'app-radio-custom',
  templateUrl: './radio-custom.component.html',
  styleUrls: ['./radio-custom.component.scss']
})
export class RadioCustomComponent {
  @Input() idRadio: string;
  @Input() control: AbstractControl<any, any> | null;
  @Input() label: string | null;
  @Input() inputVal: any | null;
  @Input() readOnly: boolean;

  constructor() {
    this.idRadio = '';
    this.control = null;
    this.label = null;
    this.inputVal = null;
    this.readOnly = false;
  }

  protected get asControl(): FormControl {
    return this.control as FormControl;
  }
}
