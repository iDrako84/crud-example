import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
// STORE
import { Store } from "@ngrx/store";
// INTERFACES
import { ILoginData } from "@core/interface/user";
import { ITableDataData } from "../interfaces/table-data";
// SERVICES
import { LocalSorageService } from "@core/services/local-storage.service";
// ACTIONS
import { resetCredentials } from "@core/store/login-wrapper.actions";
import { TableDataStore } from "../../store/table-data.store";

@Injectable()
export class TableWrapperService {

    constructor(
        private readonly _store: Store<{ credentials: ILoginData }>,
        private _localStorageService: LocalSorageService,
        private _router: Router,
        private _tableDataStore: TableDataStore
    ) { }

    public logout(): void {
        this._store.dispatch(resetCredentials());
        this._localStorageService.USER.removeUser();
        this._router.navigate(['/login']);
    }

    public addUser(user: ITableDataData): void {
        this._tableDataStore.addUserData(user);
    }
}
