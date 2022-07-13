import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
/**
 * Защита от неавторизованного пользователя
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  /**
   *
   * @returns проверка токена в localStorage
   */
  public canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('auth-token') !== null) {
      return true;
    }
    this.router.navigate(['/login']);

    return false;
  }
}
