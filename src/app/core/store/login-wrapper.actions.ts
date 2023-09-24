import { createAction, props } from '@ngrx/store';
import { ILoginData } from '../interface/user';

// SETTA LE CREDENZIALI
export const setCredentials = createAction('[Login Page] Set credentials', props<ILoginData>());
// RESETTA LE CREDENZIALI
export const resetCredentials = createAction('[Login Page] Reset credentials');