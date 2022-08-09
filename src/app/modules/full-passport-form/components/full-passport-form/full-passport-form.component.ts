import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { List } from 'src/app/models/list';
import { Organization } from 'src/app/modules/new-passport-form/models/organization';
import { listDanger } from '../../consts/list-danger';
import { listEnterpriseTypes } from '../../consts/list-enterprise-types';
import { listPassportPeriod } from '../../consts/list-passport-period';
import { listPaymentMethod } from '../../consts/list-payment-method';
import { listSignalWord } from '../../consts/list-signal-word';
import { listSingleOrMultiply } from '../../consts/list-single-or-multiply';
import { Enterprise } from '../../enums/enterprise';
import { ListDictionaryValue } from '../../enums/list-dictionary-value';
import { Expert } from '../../models/expert';
import { DictionaryValueItem } from '../../models/dictionary-value-item';
import { ListData } from '../../models/list-data';
import { Passport } from '../../models/passport';
import { FullPassportService } from '../../services/full-passport-form.service/full-passport-form.service';

/**
 * Форма для редактирование ПБ
 */
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
   * Наименование паспорта
   */
  public passportName: string;

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
  public listPrevPassport: Map<string, string>;

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
  public listEnterpriseTypes: Array<ListData>;

  /**
   * Список способ оплаты
   */
  public listPaymentMethod: Array<ListData>;

  /**
   * Список срочности
   */
  public listPassportPeriod: Array<ListData>;

  /**
   * Список регулярности
   */
  public listSingleOrMultiply: Array<ListData>;

  /**
   * Список степень опасности
   */
  public listDanger: Array<ListData>;

  /**
   * Список сигнальное слово
   */
  public listSignalWord: Array<ListData>;

  /**
   * Ссылка на просмотр паспорта
   */
  public passportView: string;

  /**
   * Список выбранных предприятий
   */
  public listOfSelectedEnterprise!: Array<Enterprise>;

  /**
   * состояние checkbox
   */
  public check!: boolean;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public fullPassportService: FullPassportService,
    private router: Router
  ) {
    this.listPrevPassport = new Map<string, string>();
    this.passportName = '';
    this.listOfSelectedEnterprise = [];
    this.listEnterpriseTypes = listEnterpriseTypes;

    this.listPaymentMethod = listPaymentMethod;

    this.listPassportPeriod = listPassportPeriod;

    this.listSingleOrMultiply = listSingleOrMultiply;

    this.listDanger = listDanger;

    this.listSignalWord = listSignalWord;

    this.passportView = '#';

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.fullPassportBuildGroup();
  }

  /**
   * Конструктор формы
   */
  public fullPassportBuildGroup(): void {
    this.fullPassportForm = this.fb.group({
      startDate: [null, [Validators.required]],
      endDate: [null],
      workDate: [{ value: null, disabled: true }],
      passportNumber: [null],
      names: [null, [Validators.required]],
      tradeNames: [null, [Validators.required]],
      chemistryNames: [null],
      synonym: [null],
      normativeDocTypeId: [null, [Validators.required]],
      normativeDocCode: [null, [Validators.required]],
      okpd2CodeId: [null, [Validators.required]],
      tnVedCodeId: [null, [Validators.required]],
      mediatorId: [{ value: null, disabled: true }],
      organizationId: [{ value: null, disabled: true }],
      expert: [null],
      paymentMethod: [null, [Validators.required]],
      passportPeriod: [null],
      documentArrivalDate: [{ value: null, disabled: false }],
      nextRevisionDate: [{ value: null, disabled: true }],
      payDay: [null],
      singleOrMultiple: [{ value: null, disabled: true }],
      danger: [null],
      signalWord: [null],
      accepted: [false],
      decline: [false],
      suspend: [false],
      reRegistration: [false],
      reRegistrationNumber: [null],
      enterpriseTypes: [null, [Validators.required]],
    });
  }

  /**
   *изменяет значение check
   * @param evt event:boolean
   */
  public checked(evt: boolean): void {
    this.check = evt;
    if (!evt) {
      this.fullPassportForm.patchValue({
        reRegistrationNumber: '',
      });
    }
  }

  /**
   * Метод для отображения тип предприятия
   * @param enterprise предприятия
   * @returns boolean
   */
  public isNotSelected(enterprise: any): boolean {
    const { value } = enterprise;

    const isEqual345 = (el: Enterprise): boolean =>
      [Enterprise.Exporter, Enterprise.Importer, Enterprise.Manufacturer].includes(el);

    const isEqual35 = (el: Enterprise): boolean => [Enterprise.Exporter, Enterprise.Manufacturer].includes(el);

    if (this.listOfSelectedEnterprise.length === 0 || !this.listOfSelectedEnterprise.some(isEqual345)) return false;
    if (this.listOfSelectedEnterprise.some(isEqual35) && value !== Enterprise.Importer) return false;
    if (this.listOfSelectedEnterprise.includes(Enterprise.Importer) && !isEqual35(value)) return false;

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
    this.router.navigate(['/']);
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
    this.passportName = this.passport.names[0].value;

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
    if (this.passport.danger) {
      this.getForm.passportNumber.enable();
    } else {
      this.getForm.passportNumber.disable();
    }
  }

  /**
   * для доступа к формконтролам
   * @returns form controls
   */
  public get getForm(): any {
    return this.fullPassportForm.controls;
  }

  public ngOnInit(): void {
    this.fullPassportService
      .readPassport(this.id)
      .pipe(
        map(res => {
          this.passport = res;
          this.passportView = `https://iap_dev2.tomskasu.ru/passportView/${this.id}`;

          if (res.codeQr) {
            this.codeQrUrl = `https://iap_dev2.tomskasu.ru/file/api/${res.codeQr}`;
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
          const arrId = [organizationId];
          if (mediatorId) {
            arrId.push(mediatorId);
          }
          const reqArr = arrId.map(el => this.fullPassportService.readOrganization(el));

          return forkJoin(reqArr);
        }),
        mergeMap(res => {
          const [organization, mediator] = res;
          this.organization = organization;
          this.mediator = mediator;

          const arrLists: [
            Observable<List<Expert>>,
            Observable<List<DictionaryValueItem>>,
            Observable<List<DictionaryValueItem>>,
            Observable<List<DictionaryValueItem>>,
            Observable<any>
          ] = [
            this.fullPassportService.listExpert(),
            this.fullPassportService.listDictionaryValue(ListDictionaryValue.SystemDictsOKPD2),
            this.fullPassportService.listDictionaryValue(ListDictionaryValue.SystemDictsTNVED),
            this.fullPassportService.listDictionaryValue(ListDictionaryValue.SystemDictsDocumentNormativeType),
            this.fullPassportService.organizationPassport(this.organization.id),
          ];

          return forkJoin(arrLists);
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
