import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Новый ПБ
 */
@Component({
  selector: 'app-new-passport-form',
  templateUrl: './new-passport-form.component.html',
  styleUrls: ['./new-passport-form.component.scss'],
})
export class NewPassportFormComponent implements OnInit {
  public newPassportForm!: FormGroup;

  /**
   * состояние checkbox
   */
  public check: boolean;

  constructor(private fb: FormBuilder, private router: Router) {
    this.check = false;
  }

  /**
   *изменяет значение check
   * @param e event:boolean
   */
  public checked(e: boolean) {
    this.check = e;
  }

  /**
   *
   * @returns отправка формы
   */
  public submitForm(): void {
    return this.newPassportForm.value;
  }

  /**
   * очистка формы и перенаправление на страницу Table
   */
  public resetForm(): void {
    this.newPassportForm.reset();
    this.router.navigate(['/']);
  }

  public ngOnInit(): void {
    /**
     * валидация
     */
    this.newPassportForm = this.fb.group({
      documentArrivalDate: [null, [Validators.required]],
      names: [null, [Validators.required]],
      organization: [null],
      mediator: [false],
      mediatorValue: [null],
      singleOrMultiple: [null],
    });
  }
}
