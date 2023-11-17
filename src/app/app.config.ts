import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { credentialsReducer } from './core/store/login-wrapper.reducer';
import { environment } from 'environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      StoreModule.forRoot({ credentials: credentialsReducer }),
      !environment.production ? StoreDevtoolsModule.instrument() : []
    ),
    provideRouter(routes),
  ]
};
