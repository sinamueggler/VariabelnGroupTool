import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'No valid organization ',
            text: 'please check the organizations and select a valid organization',
         
          })

          return throwError(error);
        })
      );
    }
}

