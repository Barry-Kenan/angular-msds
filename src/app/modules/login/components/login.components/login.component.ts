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
  public validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  /**
   * Очистка формы
   */
  public resetForm(): void {
    this.validateForm.reset();
  }

  /**
   * Отправка формы
   */
  public submitForm(): void {
    if (this.validateForm.valid) {
      this.loginService.login(this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public ngOnInit(): void {
    /**
     * валидация
     */
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    });
  }
}
