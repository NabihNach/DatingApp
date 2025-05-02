import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule }                                 from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi }     from '@angular/common/http';

import { routes }                            from './app.routes';
import { ErrorInterceptorProvider }          from './_services/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(RouterModule),
    provideHttpClient(withInterceptorsFromDi()),
    ErrorInterceptorProvider,
  ]
};
