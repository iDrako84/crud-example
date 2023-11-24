import { Component, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakeIdService } from '../../services/make-id.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss']
})
export class SelectCustomComponent {
  @ViewChild('list', { static: false }) private listEl!: TemplateRef<any>;
  @ViewChild('input', { static: false }) private inputEl!: ElementRef<HTMLInputElement>;
  @ViewChild('inputSearch', { static: false }) private inputSearchEl!: ElementRef<HTMLInputElement>;
  @Input() control: AbstractControl<any, any> | null;
  @Input() placeholder: string;
  @Input() idSelect: string;
  @Input() options: { [key: string]: any }[];
  @Input() keyValue: string;
  @Input() keyLabel: string;
  @Input() readOnly: boolean;
  @Input() enableSearch: boolean;
  @Input() placeholderSearch: string;
  protected idContainer: string | null;
  protected search: string;

  constructor(
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _renderer: Renderer2,
    private _makeIdService: MakeIdService
  ) {
    this.control = null;
    this.placeholder = '';
    this.idSelect = '';
    this.options = [];
    this.keyValue = 'value';
    this.keyLabel = 'label';
    this.idContainer = this._makeIdService.onGetId(12);
    this.readOnly = false;
    this.enableSearch = true;
    this.search = '';
    this.placeholderSearch = 'Cerca...';
  }

  @HostListener('document:click', ['$event']) private clickout(event: any): void {
    if (!this._elementRef.nativeElement.contains(event?.target)) {
      this.close();
    }
  }

  @HostListener('document:scroll', ['$event']) private scrollDocument(event: any): void {
    /* this.repositionList(); */
    this.close();
  }

  @HostListener('window:resize', ['$event']) private resizeDocument(event: any): void {
    /* this.repositionList(); */
    this.close();
  }

  protected get getOptions(): { [key: string]: any }[] {
    if (!this.search) {
      return this.options;
    }
    return this.options.filter((item: { [key: string]: any }) => item.hasOwnProperty(this.keyLabel) && new RegExp(this.search, 'gi').test(item[this.keyLabel]));
  }

  protected get validatorRequired() {
    const validator = this.asControl?.validator?.({} as AbstractControl) || null;
    if (validator && validator['required']) {
      return true;
    } else {
      return false;
    }
  }

  protected get asControl(): FormControl {
    return this.control as FormControl;
  }

  protected get inputVal(): string {
    if (this.control?.value !== undefined && this.control?.value !== null) {
      const find = this.options.find((opt: { [key: string]: any }) => {
        if (opt[this.keyValue] === this.control?.value) return true;
        return false;
      });
      return find?.[this.keyLabel] !== undefined ? find[this.keyLabel] : '';
    } else {
      return '';
    }
  };

  protected setValue(e: Event, value: any): void {
    e.stopPropagation();
    this.control?.setValue(value);
    this.control?.markAsDirty();
    this.toggle();
  }

  protected onKeyup(event: KeyboardEvent) {
    const key = event.keyCode || event.charCode;
    if (key === 13 || key === 32) {               // enter (cr)
      this.toggle();
    }
  }

  protected toggle(e?: Event): void {
    e?.stopPropagation();
    const child = document.querySelectorAll('[select-list-custom]');
    const position = this.inputEl.nativeElement.getBoundingClientRect();

    if (child.length) {
      for (const item of Array.from(child)) {
        document.body.removeChild(item);
      }
    } else {
      this.search = '';
      const embeddedViewRef = this._viewContainerRef.createEmbeddedView(this.listEl);
      embeddedViewRef.detectChanges();
      const innerHeight = window.innerHeight;
      for (const node of embeddedViewRef.rootNodes) {
        const ell = node.querySelector(`[select-list-custom-item="${this.idContainer}"]`);
        if (innerHeight < (position.bottom + ell.offsetHeight)) {
          this._renderer.setStyle(ell, 'top', `${position.top - ell.offsetHeight - 2}px`);
        } else {
          this._renderer.setStyle(ell, 'top', `${position.bottom + 2}px`);
        }
        this._renderer.setStyle(ell, 'left', `${position.left}px`);
        this._renderer.setStyle(ell, 'min-width', `${position.width}px`);
        document.body.appendChild(node);
      }
      setTimeout(() => {
        this.inputSearchEl?.nativeElement?.focus();
      });
    }
  }

  protected setClassLabel(): { '!px-2': boolean, '!text-color-custom': boolean, '!scale-100': boolean, '!-translate-y-1/2': boolean, '!top-1/2': boolean, '!text-red-600': boolean } {
    return {
      '!px-2': this.control?.value === undefined || this.control?.value === null,
      '!text-color-custom': this.control?.value !== undefined && this.control?.value !== null,
      '!scale-100': this.control?.value === undefined || this.control?.value === null,
      '!-translate-y-1/2': this.control?.value === undefined || this.control?.value === null,
      '!top-1/2': this.control?.value === undefined || this.control?.value === null,
      '!text-red-600': !!(this.control?.invalid && !this.control.pristine)
    };
  }

  protected setClassLi(f: boolean, l: boolean): { 'border-b-2': boolean, 'border-b-color-custom': boolean, 'rounded-t-md': boolean, 'rounded-b-md': boolean } {
    return {
      'border-b-2': l,
      'border-b-color-custom': l,
      'rounded-t-md': f && !this.enableSearch,
      'rounded-b-md': l
    };
  }

  protected getErrorInput(): { '!border-red-600': boolean } {
    return {
      '!border-red-600': !!(this.control?.invalid && !this.control.pristine)
    };
  }

  protected getContainerSearch(): { '!bg-color-custom': boolean } {
    return {
      '!bg-color-custom': this.inputSearchEl?.nativeElement === document.activeElement
    };
  }

  /* private repositionList(): void {
    const childs = document.querySelectorAll('[select-list-custom]');
    const child = document.querySelector(`[select-list-custom-item="${this.idContainer}"]`);
    const listPosition = child?.getBoundingClientRect();
    const innerHeight = window.innerHeight;
    const inputElPosition = this.inputEl.nativeElement.getBoundingClientRect();
    if (child && listPosition && (inputElPosition.top > 0 && inputElPosition.top < innerHeight)) {
      if (innerHeight < (inputElPosition.bottom + listPosition.height)) {
        this._renderer.setStyle(child, 'top', `${inputElPosition.top - listPosition.height - 2}px`);
      } else {
        this._renderer.setStyle(child, 'top', `${inputElPosition.bottom + 2}px`);
      }
      this._renderer.setStyle(child, 'left', `${inputElPosition.left}px`);
      this._renderer.setStyle(child, 'min-width', `${inputElPosition.width}px`);
    } else {
      for (const item of Array.from(childs)) {
        document.body.removeChild(item);
      }
    }
  } */

  private close(): void {
    const child = document.querySelectorAll('[select-list-custom]');
    if (child.length) {
      for (const item of Array.from(child)) {
        document.body.removeChild(item);
      }
    }
  }
}
