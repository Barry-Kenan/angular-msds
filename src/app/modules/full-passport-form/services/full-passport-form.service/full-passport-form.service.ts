import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router, private requestService: RequestService) {}
}
