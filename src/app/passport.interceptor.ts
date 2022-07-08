import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PassportInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === 'https://iap_dev2.tomskasu.ru/api/worker/list_passport') {
      return next.handle(this.addAuthToken(request));
    }
    return next.handle(request);
  }

  public addAuthToken(request: HttpRequest<any>) {
    const AuthToken = localStorage.getItem('auth-token');

    return request.clone({
      setHeaders: {
        authorization: `Bearer ${AuthToken}`,
      },
    });
  }
}
