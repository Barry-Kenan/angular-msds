import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, Observable, throwError } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { User } from 'src/app/modules/login/models/user';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private message: NzMessageService, private requestService: RequestService) {}

  /**
   * Запрос логин
   * @param user логин пароль ремембер
   * @returns Observable
   */
  public login<LoginResponse>(user: User): Observable<LoginResponse> {
    const body: User = {
      login: user.login,
      password: user.password,
      remember: user.remember,
    };

    return this.requestService.postRequest<LoginResponse>(body).pipe(
      catchError((err: HttpErrorResponse) => {
        this.message.error('Некорректные учётные данные пользователя', { nzDuration: 2000 });

        return throwError(() => err);
      })
    );
  }
}
