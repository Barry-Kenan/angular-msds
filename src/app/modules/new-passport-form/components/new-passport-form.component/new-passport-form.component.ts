import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list';
import { Organization } from 'src/app/modules/new-passport-form/models/organization';
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
   * список организаций
   */
  public listOrganizations: Array<Organization>;

  constructor(private fb: FormBuilder, private router: Router, public newPassportFormService: NewPassportFormService) {
    this.check = false;
    this.listOrganizations = [];
  }

  /**
   *изменяет значение check
   * @param evt event:boolean
   */
  public checked(evt: boolean): void {
    this.check = evt;
    if (!evt) {
      this.newPassportForm.patchValue({
        mediatorId: '',
      });
    }
  }

  /**
   * Отправка формы
   */
  public submitForm(): void {
    this.newPassportFormService.addNewPassport(this.newPassportForm.value).subscribe();
    this.router.navigate(['/']);
  }

  /**
   * очистка формы и перенаправление на страницу Table
   */
  public resetForm(): void {
    this.newPassportForm.reset();
    this.router.navigate(['/']);
  }

  /**
   * для доступа к формконтролам
   * @returns form controls
   */
  public get getForm(): any {
    return this.newPassportForm.controls;
  }

  public ngOnInit(): void {
    this.newPassportFormService.getOrganizations().subscribe((res: List<Organization>) => {
      this.listOrganizations = res.items;
    });
    // конструктор формы
    this.newPassportForm = this.fb.group({
      documentArrivalDate: [null, [Validators.required]],
      names: [null, [Validators.required]],
      organizationId: [null, [Validators.required]],
      isMediator: [false],
      mediatorId: [null],
      singleOrMultiple: [null, [Validators.required]],
    });
  }
}
