import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from 'src/models/user';
import { environment } from 'src/environments/environment';
import { List } from 'src/models/list';
import { ColumnName } from '../../../models/column-name';
import { Direction } from '../../../models/direction';
import { PassportResponse } from '../../../models/passport-response';
import { statusName } from '../../../modules/table/consts/status-name';
import { UserProfile } from '../../../models/user-profile';
import { ListPassport } from '../../../models/list-passport';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * user data пользователя
   */
  public userProfileData!: UserProfile;

  constructor(private http: HttpClient, private router: Router, private message: NzMessageService) {}

  /**
   * метод для получения списка ПБ
   * @param column столбцы
   * @param direction 1 | -1
   * @param page страницы от 0
   * @returns объект с items и totalCount
   */
  public getListPassport(column: ColumnName, direction: Direction, page: number): Observable<List<ListPassport>> {
    const params = [
      {
        contains: true,
        extraOptions: [
          {
            name: 'sort',
            value: '',
          },
        ],
        pagination: {
          page,
          pageSize: 10,
        },
        searchString: {
          lang: 'ru',
          value: '',
        },
        tableSortParams: {
          columns: [
            {
              column,
              direction,
            },
          ],
        },
      },
    ];
    const method = 'list_passport';

    return this.postRPC<PassportResponse>(params, method).pipe(
      map((res: PassportResponse) => {
        const { totalCount } = res.result;
        const items = res.result.items.map((item: ListPassport, index: number) => {
          const test = item;
          test.serialNumber = index + 1;
          test.status = statusName.get(item.status) || '';

          return test;
        });

        return { items, totalCount };
      })
    );
  }

  /**
   * @param user логин пароль ремембер
   * @returns запрос логин
   */
  public login(user: User) {
    const body = {
      login: user.userName,
      password: user.password,
      remember: user.remember,
    };

    return this.postRequest(body)
      .pipe(
        catchError((err: any) => {
          this.message.error('Некорректные учётные данные пользователя', { nzDuration: 2000 });

          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.userProfileData = res.userProfile;
        this.router.navigate(['/']);
        localStorage.setItem('auth-token', res.accessToken);
      });
  }

  /**
   * @param body тело для пост запроса
   * @returns пост запрос на login
   */
  private postRequest(body: any) {
    const postUrl = `${environment.host}login`;

    return this.http.post(postUrl, body);
  }

  /**
   * Post-запрос для JSON-RPC
   * @param params Параметры
   * @param method Метод
   * @returns Результат запроса
   */
  private postRPC<T>(params: any, method: string): Observable<T> {
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
