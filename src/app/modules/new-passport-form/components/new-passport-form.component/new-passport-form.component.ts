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
  /**
   * Форма для нового ПБ
   */
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
   * @param evt event:boolean
   */
  public checked(evt: boolean): void {
    this.check = evt;
  }

  /**
   *отправка формы
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
    // конструктор формы
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
