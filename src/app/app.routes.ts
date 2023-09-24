import { Routes } from '@angular/router';
import { AuthGuardLogin } from './core/auth/auth-guard.service';
import { LoginService } from './features/login/utils/services/login.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TableWrapperService } from './features/table-user/utils/services/table-wrapper.service';
import { HttpInterceptorService } from './core/interceptor/http-interceptor';

const httpClient = provideHttpClient(
  withInterceptors([HttpInterceptorService])
);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/components/login-wrapper/login-wrapper.component').then(m => m.LoginWrapperComponent),
    providers: [
      httpClient,
      LoginService
    ]
  },
  {
    path: 'table-user',
    loadComponent: () => import('./features/table-user/components/table-user-wrapper/table-user-wrapper.component').then(m => m.TableUserWrapperComponent),
    canActivate: [AuthGuardLogin],
    providers: [
      httpClient
    ]
  }
];
