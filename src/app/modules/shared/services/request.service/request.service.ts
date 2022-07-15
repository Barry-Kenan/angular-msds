import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient, private router: Router, private message: NzMessageService) {}

  /**
   * @param body тело для пост запроса
   * @returns пост запрос на login
   */
  public postRequest(body: any) {
    const postUrl = `${environment.host}login`;

    return this.http.post(postUrl, body);
  }

  /**
   * Post-запрос для JSON-RPC
   * @param params Параметры
   * @param method Метод
   * @returns Результат запроса
   */
  public postRPC<T>(params: any, method: string): Observable<T> {
    const postUrl = `${environment.host}worker/${method}`;
    const body = {
      id: 1,
      jsonrpc: '2.0',
      params,
      method,
    };

    return this.http.post<T>(postUrl, body);
  }
}
