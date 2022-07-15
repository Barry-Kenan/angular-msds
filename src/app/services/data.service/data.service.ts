import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from 'src/models/user';
import { ColumnName } from '../../../models/column-name';
import { Direction } from '../../../models/direction';
import { PassportResponse } from '../../../models/passport-response';
import { RequestBody } from '../../../models/request-body';
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
  public url: string;

  public userProfileData!: UserProfile;

  constructor(private http: HttpClient, private router: Router, private message: NzMessageService) {
    this.url = 'https://iap_dev2.tomskasu.ru/api/';
  }

  /**
   *
   * @param column столбцы
   * @param direction 1 | -1
   * @param page страницы от 0
   * @returns список ПБ
   */
  public getListPassport(column: ColumnName, direction: Direction, page: number): Observable<any> {
    const url = `${this.url}worker/list_passport`;
    const body = this.body(column, direction, page);

    return this.postAPI(url, body).pipe(
      map((res: PassportResponse) => {
        const { totalCount } = res.result;
        const items = res.result.items.map((item: ListPassport, index: number) => ({
          ...item,
          serialNumber: index + 1,
          status: statusName.get(item.status),
        }));

        return { items, totalCount };
      })
    );
  }

  /**
   *
   * @param user логин пароль ремембер
   * @returns запрос логин
   */
  public login(user: User) {
    const url = `${this.url}login`;
    const body = {
      login: user.userName,
      password: user.password,
      remember: user.remember,
    };

    return this.postAPI(url, body)
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
   *
   * @param url url
   * @param body тело запроса
   * @returns пост метод
   */
  private postAPI(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  /**
   * @param column столбцы
   * @param directions для сортировки 1|-1
   * @param page страница от 0
   * @returns тело запроса
   */
  private body = (column: ColumnName, directions: 1 | -1, page: number): RequestBody => ({
    id: '384c601d-875d-4797-b50b-ea796a9d4f36',
    jsonrpc: '2.0',
    params: [
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
              direction: directions,
            },
          ],
        },
      },
    ],
    method: 'list_passport',
  });
}
