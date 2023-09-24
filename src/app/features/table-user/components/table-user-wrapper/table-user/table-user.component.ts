import { Component, OnDestroy, OnInit } from "@angular/core";
// SERVICES
import { TableDataStore } from "../../../store/table-data.store";
// INTERFACES
import { ITableData, ITableDataData } from "../../../utils/interfaces/table-data";
// RXJS
import { Observable, Subscription, map } from "rxjs";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@Component({
    standalone: true,
    imports: [
        CommonModule
    ],
    selector: 'app-table-user',
    templateUrl: './table-user.component.html',
    styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit, OnDestroy {
    public tableData$: Observable<ITableDataData[]>;
    private subs: Subscription;

    constructor(
        private _http: HttpClient,
        private _tableDataStore: TableDataStore
    ) {
        this.tableData$ = this._tableDataStore.tableData$;
        this.subs = new Subscription();
    }

    ngOnInit(): void {
        this.subs.add(
            this._tableDataStore.tableData$.subscribe((tableData) => console.log(tableData))
        );
        this._http.get<ITableData>(`assets/api/table-data.json`)
            .pipe(
                map(res => res.data)
            )
            .subscribe((tableData) => this._tableDataStore.setTableData(tableData));
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
