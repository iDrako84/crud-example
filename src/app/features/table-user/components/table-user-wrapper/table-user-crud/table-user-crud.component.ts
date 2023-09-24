import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// SERVICES
import { TableWrapperService } from '../../../utils/services/table-wrapper.service';
import { InputCustomComponent } from '@app/shared/form-custom/input-custom/input-custom.component';
import { SelectCustomComponent } from '@app/shared/form-custom/select-custom/select-custom.component';
import { ButtonPrimaryDirective } from '@app/shared/directive-custom/button-custom/button-primary.directive';

@Component({
    standalone: true,
    imports: [
        FormsModule, 
        ReactiveFormsModule,
        InputCustomComponent,
        SelectCustomComponent,
        ButtonPrimaryDirective
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
            user: new FormControl<string | null>(null, [Validators.required]),
            email: new FormControl<string | null>(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            admin: new FormControl<boolean>(false, { nonNullable: true }),
        });
    }

    public onSubmit(): void {
        this._tableWrapperService.addUser(this.userForm.value);
    }
}