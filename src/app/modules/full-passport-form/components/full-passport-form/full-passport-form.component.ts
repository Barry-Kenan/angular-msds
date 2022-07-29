import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, mergeMap, Observable, Subscription } from 'rxjs';
import { List } from 'src/app/models/list';
import { Organization } from 'src/app/modules/new-passport-form/models/organization';
import { environment } from 'src/environments/environment';
import { listDanger } from '../../consts/list-danger';
import { listEnterpriseTypes } from '../../consts/list-enterprise-types';
import { listPassportPeriod } from '../../consts/list-passport-period';
import { listPaymentMethod } from '../../consts/list-payment-method';
import { listSignalWord } from '../../consts/list-signal-word';
import { listSingleOrMultiply } from '../../consts/list-single-or-multiply';
import { Expert } from '../../models/expert';
import { DictionaryValueItem } from '../../models/list-dictionary-value-item';
import { ListDictionaryValues } from '../../models/list-dictionary-values';
import { Lists } from '../../models/lists';
import { Passport } from '../../models/passport';
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
  public passport!: Passport;

  /**
   * Данные организации
   */
  public organization!: Organization;

  /**
   * Данные посредника
   */
  public mediator!: Organization;

  /**
   * Идентификатор ПБ
   */
  public id: string | undefined;

  /**
   * Список экспертов
   */
  public listExpert!: Array<Expert>;

  /**
   * Список Код ОКПД 2
   */
  public okpd2!: Array<DictionaryValueItem>;

  /**
   * Список Код ТН ВЭД ЕАЭС
   */
  public tnVed!: Array<DictionaryValueItem>;

  /**
   * Список НД
   */
  public normativeDoc!: Array<DictionaryValueItem>;

  /**
   * Список предыдущих ПБ
   */
  public listPrevPassport!: Map<string, string>;

  /**
   * Номер ПБ
   */
  public passportNumber!: number;

  /**
   * Qr код
   */
  public codeQrUrl!: string;

  /**
   * Список тип предприятий
   */
  public listEnterpriseTypes: Array<Lists>;

  /**
   * Список способ оплаты
   */
  public listPaymentMethod: Array<Lists>;

  /**
   * Список срочности
   */
  public listPassportPeriod: Array<Lists>;

  /**
   * Список регулярности
   */
  public listSingleOrMultiply: Array<Lists>;

  /**
   * Список степень опасности
   */
  public listDanger: Array<Lists>;

  /**
   * Список сигнальное слово
   */
  public listSignalWord: Array<Lists>;

  /**
   * Ссылка на просмотр паспорта
   */
  public passportView: string;

  /**
   * Список выбранных предприятий
   */
  public listOfSelectedEnterprise!: any[];

  /**
   * состояние checkbox
   */
  public check!: boolean;

  /**
   * Подписка на изменения
   */
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    public fullPassportService: FullPassportService
  ) {
    this.listOfSelectedEnterprise = [];
    this.listEnterpriseTypes = listEnterpriseTypes;

    this.listPaymentMethod = listPaymentMethod;

    this.listPassportPeriod = listPassportPeriod;

    this.listSingleOrMultiply = listSingleOrMultiply;

    this.listDanger = listDanger;

    this.listSignalWord = listSignalWord;

    this.passportView = '#';

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
      mediatorId: [{ value: null, disabled: true }],
      organizationId: [{ value: null, disabled: true }],
      expert: [null],
      paymentMethod: [null],
      passportPeriod: [null],
      documentArrivalDate: [{ value: null, disabled: true }],
      nextRevisionDate: [null],
      payDay: [null],
      singleOrMultiple: [{ value: null, disabled: true }],
      danger: [null],
      signalWord: [null],
      accepted: [false],
      decline: [false],
      suspend: [false],
      reRegistration: [false],
      reRegistrationNumber: [null],
      enterpriseTypes: [null],
    });
  }

  /**
   *изменяет значение check
   * @param evt event:boolean
   */
  public checked(evt: boolean): void {
    this.check = evt;
  }

  /**
   * Метод для отображения тип предприятия
   * @param enterprise предприятия
   * @returns boolean
   */
  public isNotSelected(enterprise: any): boolean {
    const { value } = enterprise;

    const isEqual345 = (el: string): boolean => ['3', '4', '5'].includes(el);

    const isEqual35 = (el: string): boolean => ['3', '5'].includes(el);

    if (this.listOfSelectedEnterprise.length === 0 || !this.listOfSelectedEnterprise.some(isEqual345)) return false;
    if (this.listOfSelectedEnterprise.some(isEqual35) && value !== '4') return false;
    if (this.listOfSelectedEnterprise.includes('4') && !isEqual35(value)) return false;

    return true;
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
   */
  public submitForm(): void {
    const passportForm: Passport = {
      ...this.fullPassportForm.value,
      organizationId: this.passport.organizationId,
      codeQr: this.passport.codeQr,
      id: this.passport.id,
      status: this.passport.status,
      names: [{ value: this.fullPassportForm.value.names, lang: 'ru' }],
      tradeNames: [{ value: this.fullPassportForm.value.tradeNames, lang: 'ru' }],
      chemistryNames: [{ value: this.fullPassportForm.value.chemistryNames, lang: 'ru' }],
    };

    if (this.fullPassportForm.value.chemistryNames.length === 0) {
      passportForm.chemistryNames = [{ value: '', lang: 'ru' }];
    }

    this.fullPassportService.updatePassport(passportForm).subscribe();
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
  public patch(): void {
    this.fullPassportForm.patchValue({
      ...this.passport,
      names: this.passport.names[0].value,
      tradeNames: this.passport.tradeNames[0].value,
      organizationId: this.organization.names[0].value,
    });
    if (this.passport.chemistryNames.length) {
      this.fullPassportForm.patchValue({
        chemistryNames: this.passport.chemistryNames[0].value,
      });
    }
    if (this.mediator) {
      this.fullPassportForm.patchValue({
        mediatorId: this.mediator.names[0].value,
      });
    }
  }

  public ngOnInit(): void {
    this.fullPassportService
      .readPassport(this.id)
      .pipe(
        map(res => {
          this.passport = res;
          this.passportView = environment.passportView + this.id;

          if (res.codeQr) {
            this.codeQrUrl = environment.fileHost + res.codeQr;
          }
          const { organizationId, mediatorId } = res;

          const result = [organizationId];
          if (mediatorId) {
            result.push(mediatorId);
          }

          return result;
        }),
        mergeMap(res => {
          const [organizationId, mediatorId] = res;
          const arr = [organizationId];
          if (mediatorId) {
            arr.push(mediatorId);
          }
          const reqArr = arr.map(el => this.fullPassportService.readOrganization(el));

          return forkJoin(reqArr);
        }),
        mergeMap(res => {
          const [first, second] = res;
          this.organization = first;
          this.mediator = second;

          const ArrLists: [
            Observable<List<Expert>>,
            Observable<List<DictionaryValueItem>>,
            Observable<List<DictionaryValueItem>>,
            Observable<List<DictionaryValueItem>>,
            Observable<any>
          ] = [
            this.fullPassportService.listExpert(),
            this.fullPassportService.listDictionaryValue(ListDictionaryValues.SystemDictsOKPD2),
            this.fullPassportService.listDictionaryValue(ListDictionaryValues.SystemDictsTNVED),
            this.fullPassportService.listDictionaryValue(ListDictionaryValues.SystemDictsDocumentNormativeType),
            this.fullPassportService.organizationPassport(this.organization.id),
          ];

          return forkJoin(ArrLists);
        })
      )
      .subscribe(result => {
        const [listExpert, listOkpd2, listTnVed, listNormativeDoc, listPassport] = result;

        this.listExpert = listExpert.items;
        this.okpd2 = listOkpd2.items;
        this.tnVed = listTnVed.items;
        this.normativeDoc = listNormativeDoc.items;
        Object.entries<number>(listPassport).forEach(([key, value]) =>
          this.listPrevPassport.set(key, value.toString())
        );
        this.patch();
      });
  }
}
