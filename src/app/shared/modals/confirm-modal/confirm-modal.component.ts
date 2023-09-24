import { Component } from "@angular/core";
// SERVICES
import { ModalService } from "../../services/modal.service";
import { ButtonPrimaryDirective } from "@app/shared/directive-custom/button-custom/button-primary.directive";
import { ButtonDangerDirective } from "@app/shared/directive-custom/button-custom/button-danger.directive";

@Component({
    standalone: true,
    imports: [
        ButtonPrimaryDirective,
        ButtonDangerDirective
    ],
    selector: 'app-confirm-modal',
    template: `
    <div class="bg-white">
        <h1 class="p-2">Logout?</h1>
        <div class="border border-gray-300 my-1"></div>
        <div class="flex p-2">
            <div class="w-full text-right">
                <button type="button" class="ml-1" appButtonPrimary (click)="_modalService.close(true)">YES</button>
                <button type="button" class="ml-1" appButtonDanger (click)="_modalService.close(false)">NO</button>
            </div>
        </div>
    </div>
    `
})
export class ConfirmModalComponent {

    constructor(
        public _modalService: ModalService
    ) {
        console.log('ok')
    }
}