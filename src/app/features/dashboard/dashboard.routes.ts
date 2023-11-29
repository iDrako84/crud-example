import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpInterceptorService } from '@app/core/interceptor/http-interceptor';
import { LoginService } from '../login/utils/services/login.service';
import { TableDataStore } from './store/table-data.store';
import { TableWrapperService } from './utils/services/table-wrapper.service';

const httpClient = provideHttpClient(
  withInterceptors([HttpInterceptorService])
);

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard.component').then(m => m.DashboardComponent),
    providers: [
        httpClient,
        TableDataStore,
        TableWrapperService
    ],
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'table-user'
        },
        {
          path: 'table-user',
          loadComponent: () => import('./components/table-user/table-user.component').then(m => m.TableUserComponent),
          providers: [
            httpClient
          ]
        },
        {
          path: 'crud-user',
          loadComponent: () => import('./components/crud-user/crud-user.component').then(m => m.CrudUserComponent),
          providers: [
            httpClient
          ]
        }
    ]
  },
];