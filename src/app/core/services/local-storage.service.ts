import { Injectable } from "@angular/core";
import { ILoginData } from "../interface/user";

@Injectable({ providedIn: 'root' })
export class LocalSorageService {

    public USER = {
        setUser: (user: ILoginData) => this.setUser(user),
        getUser: () => this.getUser(),
        removeUser: () => this.removeUser(),
    }

    private setUser(user: ILoginData): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    private getUser(): ILoginData | null {
        const user: string | null = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user) as ILoginData;
        }
        return null;
    }

    private removeUser(): void {
        localStorage.removeItem('user');
    }
}
