import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { Column } from './models/column-type';
import { Direction } from './models/direction';
import { RequestBody } from './models/request-body';
import { UserProfile } from './models/user-profile';
import { User } from './User';

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

  public getListPassport(column: Column, direction: Direction, page: number) {
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
        this.router.navigate(['/']);
        localStorage.setItem('auth-token', res.accessToken);
      });
  }

  private postAPI(url: string, body: any) {
    return this.http.post(url, body);
  }

  private body = (columns: Column, directions: 1 | -1, page: number): RequestBody => ({
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
              column: columns,
              direction: directions,
            },
          ],
        },
      },
    ],
    method: 'list_passport',
  });
}
