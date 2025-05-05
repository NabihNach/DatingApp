import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error: any) => {
          let errorMessage = 'Unknown error occurred';
  
          if (error.status === 401) {
            errorMessage = 'Unauthorized: Please log in again.';
          } else if (error instanceof HttpErrorResponse) {
            const applicationError = error.headers.get('Application-Error');
            if (applicationError) {
              errorMessage = applicationError;
            } else {
              const serverError = error.error;
              let modalStateErrors = '';
  
              if (serverError?.errors && typeof serverError.errors === 'object') {
                for (const key in serverError.errors) {
                  if (serverError.errors[key]) {
                    modalStateErrors += serverError.errors[key] + '\n';
                  }
                }
              }
  
              errorMessage = modalStateErrors || serverError?.title || serverError?.message || 'Server Error';
            }
          }
  
          // 🔥 Log or alert here
          console.error('User message:', errorMessage);
          // Optionally use `alert()` or a toast service here
          // alert(errorMessage);
  
          return throwError(() => new Error(errorMessage));
        })
      );
    }
  }
  