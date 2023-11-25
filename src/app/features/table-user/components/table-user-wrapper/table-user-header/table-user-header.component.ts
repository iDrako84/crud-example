import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
// SERVICES
import { TableWrapperService } from "../../../utils/services/table-wrapper.service";
import { ModalService } from "@shared/services/modal.service";
// INTERFACES
import { ILoginData } from "@core/interface/user";
/* MODALS */
import { ConfirmModalComponent } from "@shared/modals/confirm-modal/confirm-modal.component";
// RXJS
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { TableUserCrudComponent } from "../table-user-crud/table-user-crud.component";
import { DropdownModule } from "@app/shared/dropdown/dropdown.module";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        TableUserCrudComponent,
        DropdownModule
    ],
    selector: 'app-table-user-header',
    templateUrl: './table-user-header.component.html',
    styleUrls: ['./table-user-header.component.scss']
})
export class TableUserHeaderComponent {
    public credentials$: Observable<ILoginData>;

    constructor(
        private readonly _store: Store<{ credentials: ILoginData }>,
        private _tableWrapperService: TableWrapperService,
        private _modalService: ModalService
    ) {
        this.credentials$ = this._store.select('credentials');
    }

    public logout(): void {
        const modalRef = this._modalService.open(ConfirmModalComponent, {data: 'ok'});
        modalRef.close.subscribe((res: any) => {
            if (res) {
                this._tableWrapperService.logout();
            }
        });
    }
}
