import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
// INTERFACES
import { ITableDataData } from "../utils/interfaces/table-data";
import { Observable } from "rxjs";


@Injectable()
export class TableDataStore extends ComponentStore<ITableDataData[]> {

    constructor() {
        super([]);
    }

    readonly tableData$: Observable<ITableDataData[]> = this.select(state => state);

    readonly setTableData = this.updater((state, tableData: ITableDataData[]) => (tableData));

    readonly addUserData = this.updater((state, user: ITableDataData) => (state = [...state, user]));
}