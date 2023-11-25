import { Component, Input, OnInit } from "@angular/core";
// SERVICES
import { ModalService } from "../../services/modal.service";
import { ButtonCustomDirective } from "@app/shared/directives/button-custom.directive";

@Component({
    standalone: true,
    imports: [
        ButtonCustomDirective
    ],
    selector: 'app-confirm-modal',
    template: `
    <div class="bg-white">
        <h1 class="p-2">Logout?</h1>
        <div class="border border-gray-300 my-1"></div>
        <div class="flex p-2">
            <div class="w-full text-right">
                <button type="button" class="ml-1" button-custom color="primary" (click)="_modalService.close(true)">YES</button>
                <button type="button" class="ml-1" button-custom color="danger" (click)="_modalService.close(false)">NO</button>
            </div>
        </div>
    </div>
    `
})
export class ConfirmModalComponent implements OnInit {

    constructor(
        public _modalService: ModalService
    ) { }

    ngOnInit(): void {
    }
}