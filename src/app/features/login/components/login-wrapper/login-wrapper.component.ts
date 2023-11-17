import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
// SERVICES
import { LoginService } from "../../utils/services/login.service";
import { LocalSorageService } from "@core/services/local-storage.service";
// MODELS
import { LoginDataSend, LoginModel } from "../../utils/classes/login.model";
// ACTIONS
import { setCredentials } from "@core/store/login-wrapper.actions";
// INTERFACES
import { ILoginData } from "@core/interface/user";
// ANIMATIONS
import { EnterLogin } from "@shared/animations/bounce.animation";
import { InputCustomComponent } from "@app/shared/form-custom/input-custom/input-custom.component";
import { ButtonPrimaryDirective } from "@app/shared/directive-custom/button-custom/button-primary.directive";
import { SpinnerLoaderComponent } from "@app/shared/spinner-loader/spinner-loader.component";

@Component({
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputCustomComponent,
        ButtonPrimaryDirective,
        SpinnerLoaderComponent
    ],
    selector: 'app-login-wrapper',
    templateUrl: './login-wrapper.component.html',
    styleUrls: ['./login-wrapper.component.scss'],
    animations: [
        EnterLogin
    ]
})
export class LoginWrapperComponent {
    public loginForm: FormGroup<LoginModel>;

    constructor(
        private _loginService: LoginService,
        private _router: Router,
        private readonly _store: Store,
        /* private _localSorageService: LocalSorageService */
    ) {
        this.loginForm = this._loginService.getLoginForm();
    }

    public onSubmit(): void {
        const value = this.loginForm.value;
        const dataSend: LoginDataSend = {
            email: value.email as string,
            password: value.password as string,
        };
        this._loginService.login(dataSend)
            .subscribe({
                next: (user: ILoginData) => this.goTableUser(user),
                error: (err) => console.error(err)
            });
    }

    private goTableUser(user: ILoginData): void {
        this._store.dispatch(setCredentials(user));
        /* this._localSorageService.USER.setUser(user); */
        this._router.navigate(['/table-user']);
    }
}
