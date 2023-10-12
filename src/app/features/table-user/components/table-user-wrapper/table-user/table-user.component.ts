import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
// SERVICES
import { TableDataStore } from "../../../store/table-data.store";
import { TableWrapperService } from "@app/features/table-user/utils/services/table-wrapper.service";
// INTERFACES
import { ITableData, ITableDataData } from "../../../utils/interfaces/table-data";
// RXJS
import { Observable, Subscription, map } from "rxjs";

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
        private _tableDataStore: TableDataStore,
        private _tableWrapperService: TableWrapperService
    ) {
        this.tableData$ = this._tableDataStore.tableData$;
        this.subs = new Subscription();
    }

    ngOnInit(): void {
        this.subs.add(
            this._tableDataStore.tableData$.subscribe((tableData) => console.log(tableData))
        );
        this._tableWrapperService.getDataTable();
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
