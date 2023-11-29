import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILoginData } from '@app/core/interface/user';
import { TableWrapperService } from '../../utils/services/table-wrapper.service';
import { ConfirmModalComponent } from '@app/shared/modals/confirm-modal/confirm-modal.component';
import { ModalService } from '@app/shared/services/modal.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DropdownModule } from '@app/shared/dropdown/dropdown.module';
import { Router, RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        DropdownModule
    ],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    public credentials$: Observable<ILoginData>;

    constructor(
        private readonly _store: Store<{ credentials: ILoginData }>,
        private _tableWrapperService: TableWrapperService,
        private _modalService: ModalService,
        private router: Router
    ) {
        this.credentials$ = this._store.select('credentials');
        console.log(this.router);
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