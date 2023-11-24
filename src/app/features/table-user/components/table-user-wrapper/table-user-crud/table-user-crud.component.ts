import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// SERVICES
import { TableWrapperService } from '../../../utils/services/table-wrapper.service';
import { InputCustomComponent } from '@app/shared/form-custom/input-custom/input-custom.component';
import { SelectCustomComponent } from '@app/shared/form-custom/select-custom/select-custom.component';
import { SpinnerLoaderComponent } from '@app/shared/spinner-loader/spinner-loader.component';
import { ButtonCustomDirective } from '@app/shared/directives/button-custom.directive';

@Component({
    standalone: true,
    imports: [
        FormsModule, 
        ReactiveFormsModule,
        InputCustomComponent,
        SelectCustomComponent,
        SpinnerLoaderComponent,
        ButtonCustomDirective
    ],
    selector: 'app-table-user-crud',
    templateUrl: './table-user-crud.component.html',
    styleUrls: ['./table-user-crud.component.scss']
})

export class TableUserCrudComponent {
    public userForm: FormGroup;
    public optionsAdmin = [{value: true, label: 'YES'}, {value: false, label: 'NO'}];
    
    constructor(
        private _tableWrapperService: TableWrapperService
    ) { 
        this.userForm = this._tableWrapperService.getTableUserCrud();
    }

    public onSubmit(): void {
        this._tableWrapperService.addUser(this.userForm.value);
    }
}