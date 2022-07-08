import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import {
  User, UserProfile, ColumnType, Direction, RequestBody
} from './models';

/* Сервис для логина */

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public url = 'https://iap_dev2.tomskasu.ru/api/';

  public userProfileData!: UserProfile;

  constructor(private http: HttpClient, private router: Router, private message: NzMessageService) {}

  public getListPassport(column: ColumnType, direction: Direction, page: number) {
    const url = `${this.url}worker/list_passport`;
    const body = this.body(column, direction, page);
    return this.postAPI(url, body);
  }

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
        this.router.navigate(['/table']);
        localStorage.setItem('auth-token', res.accessToken);
      });
  }

  private postAPI(url: string, body: any) {
    return this.http.post(url, body);
  }

  private body = (column: ColumnType, direction: 1 | -1, page: number): RequestBody => ({
    id: '384c601d-875d-4797-b50b-ea796a9d4f36',
    jsonrpc: '2.0',
    params: [
      {
        Contains: true,
        ExtraOptions: [
          {
            Name: 'sort',
            Value: '',
          },
        ],
        Pagination: {
          Page: page,
          PageSize: 10,
        },
        SearchString: {
          lang: 'ru',
          Value: '',
        },
        TableSortParams: {
          Columns: [
            {
              Column: column,
              Direction: direction,
            },
          ],
        },
      },
    ],
    method: 'list_passport',
  });
}
