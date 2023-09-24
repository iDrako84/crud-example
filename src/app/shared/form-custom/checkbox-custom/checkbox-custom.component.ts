import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule
  ],
  selector: 'app-checkbox-custom',
  templateUrl: './checkbox-custom.component.html',
  styleUrls: ['./checkbox-custom.component.scss']
})
export class CheckboxCustomComponent {
  @Input() idCheckbox: string;
  @Input() control: AbstractControl<any, any> | null;
  @Input() placeholder: string;
  @Input() readOnly: boolean;

  constructor() {
    this.idCheckbox = '';
    this.control = null;
    this.placeholder = '';
    this.readOnly = false;
  }

  protected get asControl(): FormControl {
    return this.control as FormControl;
  }
}
