import { FormControl } from "@angular/forms";

export class LoginModel {
    constructor(
        public email: FormControl<string | null>,
        public password: FormControl<string | null>
    ) {}
}