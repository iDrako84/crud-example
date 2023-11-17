import { Component } from "@angular/core";
import { TableUserHeaderComponent } from "./table-user-header/table-user-header.component";
import { TableUserCrudComponent } from "./table-user-crud/table-user-crud.component";
import { TableUserComponent } from "./table-user/table-user.component";
import { AccordionModule } from "@app/shared/accordion/accordion.module";
import { TableDataStore } from "../../store/table-data.store";
import { TableWrapperService } from "../../utils/services/table-wrapper.service";
import { SpinnerLoaderComponent } from "@app/shared/spinner-loader/spinner-loader.component";

@Component({
    standalone: true,
    imports: [
        TableUserHeaderComponent,
        TableUserCrudComponent,
        TableUserComponent,
        AccordionModule,
        SpinnerLoaderComponent
    ],
    selector: 'app-table-user-wrapper',
    templateUrl: './table-user-wrapper.component.html',
    styleUrls: ['./table-user-wrapper.component.scss'],
    providers: [
        TableWrapperService,
        TableDataStore
    ]
})
export class TableUserWrapperComponent {

}
