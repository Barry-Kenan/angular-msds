import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
import { User } from 'src/app/modules/login/models/user';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  /**
   * @param body тело для пост запроса
   * @returns пост запрос на login
   */
  public postRequest<T>(body: User): Observable<T> {
    const postUrl = `https://iap_dev2.tomskasu.ru/api/login`;

    return this.http.post<T>(postUrl, body);
  }

  /**
   * Post-запрос для JSON-RPC
   * @param params Параметры
   * @param method Метод
   * @returns Результат запроса
   */
  public postRPC<T>(params: any, method: string): Observable<T> {
    const postUrl = `https://iap_dev2.tomskasu.ru/api/worker/${method}`;
    const body = {
      id: 1,
      jsonrpc: '2.0',
      params,
      method,
    };

    return this.http.post<Response<T>>(postUrl, body).pipe(map(res => res.result));
  }
}
