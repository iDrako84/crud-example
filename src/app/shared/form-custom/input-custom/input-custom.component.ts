import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MakeIdService } from '../../services/make-id.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'app-input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.scss']
})
export class InputCustomComponent {
  @Input() idInput: string;
  @Input() placeholder: string;
  @Input() control: AbstractControl<any, any> | null;
  @Input() readOnly: boolean;
  @Input() type: string;

  constructor(
    private _makeIdService: MakeIdService
  ) {
    this.idInput = this._makeIdService.onGetId(12);
    this.placeholder = '';
    this.control = null;
    this.readOnly = false;
    this.type = 'text';
  }

  protected get asControl(): FormControl {
    return this.control as FormControl;
  }

  protected getErrorInput(): { '!border-red-600': boolean } {
    return {
      '!border-red-600': !!(this.control?.invalid && !this.control.pristine)
    };
  }

  protected getClassLabel(): { '!text-red-600': boolean } {
    return {
      '!text-red-600': !!(this.control?.invalid && !this.control.pristine)
    };
  }
}
