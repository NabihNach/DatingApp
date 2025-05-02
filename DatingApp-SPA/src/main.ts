import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BsDropdownModule }            from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule }     from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(
      BrowserAnimationsModule,
      BsDropdownModule.forRoot()
    )
  ]
}).catch(err => console.error(err));
