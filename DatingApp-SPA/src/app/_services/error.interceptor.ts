import { Injectable } from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 Unauthorized
        if (error.status === 401) {
          return throwError(() => new Error(error.statusText));
        }

        // Application-level custom error header
        const applicationError = error.headers.get("Application-Error");
        if (applicationError) {
          return throwError(() => new Error(applicationError));
        }

        // Model state errors in response body
        let modalStateErrors = "";
        const serverError = error.error;
        if (
          serverError &&
          typeof serverError === "object" &&
          serverError.errors
        ) {
          for (const key in serverError.errors) {
            if (serverError.errors[key]) {
              modalStateErrors += serverError.errors[key] + "\n";
            }
          }
        }

        // Fallback error message
        const message =
          modalStateErrors ||
          serverError?.message ||
          serverError ||
          "Server Error";

        return throwError(() => new Error(message));
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
