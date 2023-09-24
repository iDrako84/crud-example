import { Action, createReducer, on } from '@ngrx/store';
import * as loginWrapperAction from './login-wrapper.actions';
import { ILoginData } from '../interface/user';

const initialState: ILoginData = {
    user: null,
    email: null,
    token: null,
    admin: null
};

const loginReducer = createReducer(
    initialState,
    on(loginWrapperAction.setCredentials, (state, login) => (setCredentials(login))),
    on(loginWrapperAction.resetCredentials, state => (resetCredentials())),
);

function setCredentials(login: ILoginData) {
    return {
        user: login.user,
        email: login.email,
        token: login.token,
        admin: login.admin
    };
}

function resetCredentials() {
    return {
        user: null,
        email: null,
        token: null,
        admin: null
    };
}

export function credentialsReducer(state: ILoginData | undefined, action: Action) {
    return loginReducer(state, action);
}