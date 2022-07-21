import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from 'src/models/list';
import { Organizations } from 'src/models/organizations';
import { NewPassportFormService } from '../../services/new-passport-form.service';

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

  /**
   * список организаций и посредников
   */
  public listOrganizations: any;

  constructor(private fb: FormBuilder, private router: Router, public newPassportFormService: NewPassportFormService) {
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
   * Отправка формы
   */
  public submitForm(): void {
    this.newPassportFormService.addNewPassport(this.newPassportForm.value).subscribe();
  }

  /**
   * очистка формы и перенаправление на страницу Table
   */
  public resetForm(): void {
    this.newPassportForm.reset();
    this.router.navigate(['/']);
  }

  public ngOnInit(): void {
    this.newPassportFormService.getOrganizations().subscribe((res: List<Organizations>) => {
      this.listOrganizations = res.items;
    });
    // конструктор формы
    this.newPassportForm = this.fb.group({
      documentArrivalDate: [null, [Validators.required]],
      names: [null, [Validators.required]],
      organizationId: [null],
      isMediator: [false],
      mediatorId: [null, [Validators.required]],
      singleOrMultiple: [null, [Validators.required]],
    });
  }
}
