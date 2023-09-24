import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
// MODELS
import { LoginModel } from "../classes/login.model";
// RXJS
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ILogin } from "@app/core/interface/user";

@Injectable()
export class LoginService {
    private loginForm: FormGroup;

    constructor(private _http: HttpClient) {
        this.loginForm = new FormGroup<LoginModel>({
            email: new FormControl<string>('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
        });
    }

    public getLoginForm(): FormGroup<LoginModel> {
        return this.loginForm;
    }

    public login(): Observable<any> {
        return this._http.get<ILogin>(`assets/api/auth.json`)
            .pipe(
                map(res => res.data)
            );
    }
}
