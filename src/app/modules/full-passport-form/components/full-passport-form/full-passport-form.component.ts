import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, mergeMap, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListDictionaryValue } from '../../models/list-dictionary-value';
import { FullPassportService } from '../../services/full-passport-form.service/full-passport-form.service';

@Component({
  selector: 'app-full-passport-form',
  templateUrl: './full-passport-form.component.html',
  styleUrls: ['./full-passport-form.component.scss'],
})
export class FullPassportFormComponent implements OnInit {
  /**
   * Форма для редактирование ПБ
   */
  public fullPassportForm!: FormGroup;

  /**
   * Данные ПБ
   */
  public passport: any;

  /**
   * Данные организации
   */
  public organization: any;

  /**
   * Данные посредника
   */
  public mediator: any;

  /**
   * Идентификатор ПБ
   */
  public id: string | undefined;

  /**
   * Список экспертов
   */
  public listExpert!: Array<any>;

  /**
   * Список Код ОКПД 2
   */
  public okpd2!: Array<any>;

  /**
   * Список Код ТН ВЭД ЕАЭС
   */
  public tnVed!: Array<any>;

  /**
   * Список НД
   */
  public normativeDoc!: Array<any>;

  /**
   * Список предыдущих ПБ
   */
  public listPrevPassport!: Map<string, any>;

  /**
   * Номер ПБ
   */
  public passportNumber!: string;

  /**
   * Qr код
   */
  public codeQrUrl!: string;

  /**
   * Подписка на изменения
   */
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    public fullPassportService: FullPassportService
  ) {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listPrevPassport = new Map();

    /**
     * Конструктор формы
     */
    this.fullPassportForm = this.fb.group({
      startDate: [null],
      endDate: [null],
      workDate: [null],
      passportNumber: [null],
      names: [null, [Validators.required]],
      tradeNames: [null],
      chemistryNames: [null],
      synonym: [null],
      normativeDocTypeId: [null],
      normativeDocCode: [null],
      okpd2CodeId: [null],
      tnVedCodeId: [null],
      mediatorId: [null],
      organizationId: [null],
      expert: [null],
      paymentMethod: [null],
      passportPeriod: [null],
      documentArrivalDate: [null],
      nextRevisionDate: [null],
      payDay: [null],
      datePicker: [null],
      singleOrMultiple: [null],
      danger: [null],
      signalWord: [null],
      remember: [null],
      enterpriseTypes: [null],
      note: [null],
    });
  }

  /**
   * Метод для получения номера ПБ
   */
  public getNextNumber(): void {
    this.fullPassportService.getNextNumber(this.id).subscribe(res => {
      this.passportNumber = res.number;
      this.fullPassportForm.patchValue({
        passportNumber: this.passportNumber,
      });
    });
  }

  /**
   * Отправка формы
   * @returns ...
   */
  public submitForm(): void {
    return this.fullPassportForm.value;
  }

  /**
   * очистка формы
   */
  public resetForm(): void {
    this.fullPassportForm.reset();
  }

  /**
   * Метод для изменения значений формы
   */
  public patch(): any {
    this.fullPassportForm.patchValue({
      ...this.passport,
      names: this.passport.names[0].value,
      tradeNames: this.passport.tradeNames[0].value,
      organizationId: this.organization.names[0].value,
    });
    if (this.passport.chemistryNames) {
      this.fullPassportForm.patchValue({
        chemistryNames: this.passport.chemistryNames[0].value,
      });
    }
  }

  public ngOnInit(): void {
    this.fullPassportService
      .readPassport(this.id)
      .pipe(
        map(res => {
          this.passport = res;
          if (res.codeQr) {
            this.codeQrUrl = environment.fileHost + res.codeQr;
          }
          const { organizationId } = res;

          return organizationId;
        }),
        mergeMap(organizationId => this.fullPassportService.readOrganization(organizationId)),
        mergeMap(res => {
          this.organization = res;

          const listExpert = this.fullPassportService.listExpert();
          const listOkpd2 = this.fullPassportService.listDictionaryValue(ListDictionaryValue.SystemDictsOKPD2);
          const listTnVed = this.fullPassportService.listDictionaryValue(ListDictionaryValue.SystemDictsTNVED);
          const listNormativeDoc = this.fullPassportService.listDictionaryValue(
            ListDictionaryValue.SystemDictsDocumentNormativeType
          );
          const listPassport = this.fullPassportService.organizationPassport(res.id);

          return forkJoin([listExpert, listOkpd2, listTnVed, listNormativeDoc, listPassport]);
        })
      )
      .subscribe((result: any) => {
        const [first, second, third, fourth, fifth] = result;

        this.listExpert = first.items;
        this.okpd2 = second.items;
        this.tnVed = third.items;
        this.normativeDoc = fourth.items;
        Object.entries(fifth).forEach(([key, value]) => this.listPrevPassport.set(key, value));
        this.patch();
      });
  }
}
