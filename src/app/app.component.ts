import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAuth = false;
  public name = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth;
    // debugger;
    this.name = this.authService.getUserName;
  }

  logout() {
    this.authService.logout();
  }
}
