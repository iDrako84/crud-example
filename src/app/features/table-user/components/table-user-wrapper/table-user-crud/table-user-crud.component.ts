import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// SERVICES
import { TableWrapperService } from '../../../utils/services/table-wrapper.service';
import { InputCustomComponent } from '@app/shared/form-custom/input-custom/input-custom.component';
import { SelectCustomComponent } from '@app/shared/form-custom/select-custom/select-custom.component';
import { ButtonPrimaryDirective } from '@app/shared/directive-custom/button-custom/button-primary.directive';
import { SpinnerLoaderComponent } from '@app/shared/spinner-loader/spinner-loader.component';

@Component({
    standalone: true,
    imports: [
        FormsModule, 
        ReactiveFormsModule,
        InputCustomComponent,
        SelectCustomComponent,
        ButtonPrimaryDirective,
        SpinnerLoaderComponent
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
        this.userForm = new FormGroup({
            user: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^[a-z0-9]+$/i), Validators.min(2), Validators.max(24)]),
            email: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.min(5), Validators.max(24)]),
            admin: new FormControl<boolean>(false, { nonNullable: true }),
        });
    }

    public onSubmit(): void {
        this._tableWrapperService.addUser(this.userForm.value);
    }
}