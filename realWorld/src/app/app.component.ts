import { Component } from '@angular/core';
import { AuthService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  logIn = this.authService.isAuth
  
  constructor(private authService: AuthService) {
    
  }
  
  logout(){
    this.authService.logout()
  }
}
