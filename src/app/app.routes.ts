import { Routes } from '@angular/router';
import { AuthGuardLogin } from './core/auth/auth-guard.service';
import { LoginService } from './features/login/utils/services/login.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpInterceptorService } from './core/interceptor/http-interceptor';
import { TableDataStore } from './features/dashboard/store/table-data.store';
import { TableWrapperService } from './features/dashboard/utils/services/table-wrapper.service';

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
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.routes),
    canActivate: [AuthGuardLogin]
  }
];
