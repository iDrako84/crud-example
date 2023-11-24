import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
// INTERFACES
import { ILogin } from "@app/core/interface/user";
// MODELS
import { LoginDataSend, LoginModel } from "../classes/login.model";
// RXJS
import { Observable, map } from "rxjs";
// ENVIRONMENTS
import { environment } from "environments/environment";
import { Patterns } from "@app/shared/utils/patterns";

@Injectable()
export class LoginService {
    private loginForm: FormGroup;

    constructor(private _http: HttpClient) {
        this.loginForm = new FormGroup<LoginModel>({
            email: new FormControl<string>('', [Validators.required, Validators.pattern(Patterns.email), Validators.minLength(7), Validators.maxLength(25)]),
            password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
        });
    }

    public getLoginForm(): FormGroup<LoginModel> {
        return this.loginForm;
    }

    public login(dataSend: LoginDataSend): Observable<any> {
        return this._http.post<ILogin>(`${environment.baseUrl}${environment.api}/auth`, dataSend)
            .pipe(
                map(res => res.data)
            );
    }
}
