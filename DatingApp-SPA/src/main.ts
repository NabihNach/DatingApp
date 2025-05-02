// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/_services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    AuthService
  ]
});
