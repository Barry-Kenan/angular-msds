import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { User } from 'src/models/user';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private message: NzMessageService, private requestService: RequestService) {}

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

    return this.requestService.postRequest(body).pipe(
      catchError((err: any) => {
        this.message.error('Некорректные учётные данные пользователя', { nzDuration: 2000 });

        return throwError(err);
      })
    );
  }
}
