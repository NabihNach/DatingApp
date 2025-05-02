import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }                                 from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi }     from '@angular/common/http';

import { routes }                            from './app.routes';
import { ErrorInterceptorProvider }          from './_services/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // <-- Only one provideHttpClient(), and include withInterceptorsFromDi()
    provideHttpClient(withInterceptorsFromDi()),
    // <-- Your HTTP interceptor provider
    ErrorInterceptorProvider
  ]
};
