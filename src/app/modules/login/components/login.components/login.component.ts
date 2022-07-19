import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service/login.service';

/**
 * Логин ПБ
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * форма для логина
   */
  public newPassportForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  /**
   * Очистка формы
   */
  public resetForm(): void {
    this.newPassportForm.reset();
  }

  /**
   * Отправка формы
   */
  public submitForm(): void {
    if (this.newPassportForm.valid) {
      this.loginService.login(this.newPassportForm.value);
    } else {
      Object.values(this.newPassportForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public ngOnInit(): void {
    // валидация
    this.newPassportForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    });
  }
}
