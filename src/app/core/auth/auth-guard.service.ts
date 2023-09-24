import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
// INTERFACES
import { ILoginData } from "../interface/user";
// RXJS
import { catchError, map, of } from "rxjs";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const store: Store<{credentials: ILoginData}> = inject(Store);
    const router = inject(Router);

    return store.select('credentials').pipe(
        map((res: ILoginData) => {
            if (!res.token) {
                // UTENTE NON LOGGATO
                throw false;
            }
            // UTENTE LOGGATO
            return true;
        }),
        catchError(() => {
            router.navigate(['/login']);
            return of(false);
        })
    );
};

export const AuthGuardLogin: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);