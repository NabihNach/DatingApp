import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }                                                    from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi }                           from '@angular/common/http';
import { JwtModule, JWT_OPTIONS }                                            from '@auth0/angular-jwt';

import { routes }                    from './app.routes';
import { ErrorInterceptorProvider }  from './_services/error.interceptor';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CustomHammerConfig } from '@kolkov/ngx-gallery';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';


export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    MemberEditResolver,
    MemberListResolver,
    MemberDetailResolver,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    ErrorInterceptorProvider,
    importProvidersFrom(
      JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: () => ({
            tokenGetter,
            allowedDomains: ['localhost:5235'],
            disallowedRoutes: ['http://localhost:5235/api/auth']
          }),
          deps: []
        }
      })
    )
  ]
};
