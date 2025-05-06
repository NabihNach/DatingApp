// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Add this import
import { AuthService } from './app/_services/auth.service';
import { ErrorInterceptor } from './app/_services/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    AuthService,
    ErrorInterceptor,
    RouterModule // Ensure RouterModule is provided
  ]
});
