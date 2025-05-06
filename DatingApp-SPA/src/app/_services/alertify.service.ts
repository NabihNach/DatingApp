import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  private isBrowser: boolean;
  private alertify: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      // Dynamically import alertifyjs only in browser
      import('alertifyjs').then(lib => this.alertify = lib.default);
    }
  }

  confirm(message: string, okCallback: () => any) {
    if (this.isBrowser && this.alertify) {
      this.alertify.confirm(message, (e: any) => {
        if (e) okCallback();
      });
    }
  }

  success(message: string) {
    if (this.isBrowser && this.alertify) {
      this.alertify.success(message);
    }
  }

  error(message: string) {
    if (this.isBrowser && this.alertify) {
      this.alertify.error(message);
    }
  }

  warning(message: string) {
    if (this.isBrowser && this.alertify) {
      this.alertify.warning(message);
    }
  }

  message(message: string) {
    if (this.isBrowser && this.alertify) {
      this.alertify.message(message);
    }
  }
}
