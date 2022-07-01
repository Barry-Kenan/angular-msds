import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserProfile } from './app.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://iap_dev2.tomskasu.ru/api/';

  constructor(private http: HttpClient, private router: Router) {}

  private userProfileData: UserProfile = {
    displayName: '',
    email: '',
    emailAdditional: null,
    emailMainDispatch: '',
    firstName: '',
    id: '',
    initials: null,
    isConfirmed: false,
    isDeleted: false,
    isMediator: null,
    lastName: '',
    lastUserActivityDate: null,
    organizationId: null,
    patronymic: '',
    phone: null,
    position: null,
    registrationDate: null,
    roleId: '',
    subdivision: null,
  };

  getProfileData(): UserProfile {
    return this.userProfileData;
  }

  login(user: User) {
    const body = {
      login: user.userName,
      password: user.password,
      remember: user.remember,
    };
    return this.http.post(this.url + 'login', body).subscribe((res: any) => {
      this.userProfileData = res.userProfile;
      this.router.navigate(['/table']);
      localStorage.setItem('auth-token', res.accessToken);
    });
  }

  logout() {
    localStorage.removeItem('auth-token');
  }
  public get isAuth(): boolean {
    return localStorage.getItem('auth-token') !== null;
  }
}
