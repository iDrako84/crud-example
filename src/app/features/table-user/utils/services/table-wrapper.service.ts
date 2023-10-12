import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
// STORE
import { Store } from "@ngrx/store";
// INTERFACES
import { ILoginData } from "@core/interface/user";
import { ITableData, ITableDataData } from "../interfaces/table-data";
// SERVICES
import { LocalSorageService } from "@core/services/local-storage.service";
// ACTIONS
import { resetCredentials } from "@core/store/login-wrapper.actions";
import { TableDataStore } from "../../store/table-data.store";

import { environment } from "environments/environment";
import { map } from "rxjs";

@Injectable()
export class TableWrapperService {

    constructor(
        private readonly _store: Store<{ credentials: ILoginData }>,
        /* private _localStorageService: LocalSorageService, */
        private _router: Router,
        private _tableDataStore: TableDataStore,
        private _http: HttpClient
    ) { }

    public logout(): void {
        this._http.get<{ data: boolean }>(`${environment.baseUrl}${environment.api}/logout`)
            .pipe(
                map(res => res.data)
            )
            .subscribe({
                next: (res) => {
                    if (res) {
                        this._store.dispatch(resetCredentials());
                        /* this._localStorageService.USER.removeUser(); */
                        this._router.navigate(['/login']);
                    }
                },
                error: () => {},
            });
    }

    public addUser(user: ITableDataData): void {
        this._http.post<ITableData>(`${environment.baseUrl}${environment.api}/add-user`, user)
            .pipe(
                map((res) => res.data)
            )
            .subscribe({
                next: () => {
                    this._tableDataStore.addUserData(user)
                },
                error: () => {},
            });
    }

    public getDataTable() {
        this._http.get<ITableData>(`${environment.baseUrl}${environment.api}/table-data`)
            .pipe(
                map(res => res.data)
            )
            .subscribe({
                next: (tableData) => this._tableDataStore.setTableData(tableData),
                error: () => {},
            });
    }
}
