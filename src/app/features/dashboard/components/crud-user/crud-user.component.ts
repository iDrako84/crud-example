import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonCustomDirective } from '@app/shared/directives/button-custom.directive';
import { InputCustomComponent } from '@app/shared/form-custom/input-custom/input-custom.component';
import { SelectCustomComponent } from '@app/shared/form-custom/select-custom/select-custom.component';
import { SpinnerLoaderComponent } from '@app/shared/spinner-loader/spinner-loader.component';
import { TableWrapperService } from '../../utils/services/table-wrapper.service';

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
    selector: 'app-crud-user',
    templateUrl: './crud-user.component.html',
    styleUrls: ['./crud-user.component.scss']
})

export class CrudUserComponent {
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