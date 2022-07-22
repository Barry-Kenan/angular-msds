import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/**
 * interceptor для добавления токена
 */
@Injectable()
export class PassportInterceptor implements HttpInterceptor {
  /**
   * перехватчик который добавляет токен
   * @param request 	Объект исходящего запроса для обработки
   * @param next 	Следующий перехватчик в цепочке или серверная часть, если в цепочке не осталось перехватчиков.
   * @returns Observable
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const handleParam =
      request.url === `${environment.host}worker/list_passport` ? this.addAuthToken(request) : request;

    return next.handle(handleParam);
  }

  /**
   * метод добавления токена с localStorage
   * @param request HttpRequest
   * @returns добавляет header с токеном
   */
  public addAuthToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const authToken = localStorage.getItem('authToken');

    return request.clone({
      setHeaders: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }
}
