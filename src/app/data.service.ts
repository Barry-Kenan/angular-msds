import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserProfile, ColumnType, Direction } from './modules';

// Сервис для логина*//
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://iap_dev2.tomskasu.ru/api/';
  private userProfileData!: UserProfile;
  private body = (column: ColumnType, direction: 1 | -1, page: number) => {
    return {
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
    };
  };

  constructor(private http: HttpClient, private router: Router) {}

  private postAPI(url: string, body: any) {
    return this.http.post(url, body);
  }

  public getListPassport(
    column: ColumnType,
    direction: Direction,
    page: number
  ) {
    let url = this.url + 'worker/list_passport';
    let body = this.body(column, direction, page);
    return this.postAPI(url, body);
  }

  public login(user: User) {
    let url = this.url + 'login';
    let body = {
      login: user.userName,
      password: user.password,
      remember: user.remember,
    };

    return this.postAPI(url, body).subscribe((res: any) => {
      this.userProfileData = res.userProfile;
      this.router.navigate(['/table']);
      localStorage.setItem('auth-token', res.accessToken);
    });
  }
}
