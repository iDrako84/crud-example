import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SpinnerLoaderComponent } from '@app/shared/spinner-loader/spinner-loader.component';
import { RouterModule } from '@angular/router';
import { TableDataStore } from '../store/table-data.store';
import { TableWrapperService } from '../utils/services/table-wrapper.service';

@Component({
    standalone: true,
    imports: [
        HeaderComponent,
        SpinnerLoaderComponent,
        RouterModule
    ],
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}