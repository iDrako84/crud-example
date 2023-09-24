export interface ILogin {
    data: ILoginData;
}

export interface ILoginData {
    user: string | null;
    email: string | null;
    token: string | null;
    admin: boolean | null;
}