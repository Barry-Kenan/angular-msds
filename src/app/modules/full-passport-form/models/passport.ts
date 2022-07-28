import { LocalizationDto } from 'src/app/models/localization-dto';

/**
 * Тип данных ПБ
 */
export interface Passport {
  /**
   * Подтверждение ПБ
   */
  accepted: boolean;
  /**
   * Химическое наименование ПБ
   */
  chemistryNames: [LocalizationDto];
  /**
   * Qr-код
   */
  codeQr: string;
  /**
   * Пользователь создавший ПБ
   */
  createUserId: string;
  /**
   * Роль пользователя, создавшего ПБ
   */
  createUserRoleId: string;
  /**
   * Степень опасности
   */
  danger: string;
  /**
   * Отказ
   */
  decline: boolean;
  /**
   * Дата поступления документа
   */
  documentArrivalDate: Date;
  /**
   * Дата окончания ПБ
   */
  endDate: Date;
  /**
   * Тип предприятия
   */
  enterpriseTypes: [string];
  /**
   * Имеет соглашение
   */
  hasFrameworkAgreement: boolean;
  /**
   * Идентификатор ПБ
   */
  id: string;
  /**
   * Техническое наименование ПБ
   */
  names: [LocalizationDto];
  /**
   * Шифр нормативного документа
   */
  normativeDocCode: string;
  /**
   * Обозначение нормативного документа
   */
  normativeDocTypeId: string;
  /**
   * Примечание
   */
  notes: [];
  /**
   * ОКПД 2
   */
  okpd2CodeId: string;
  /**
   * Организация заявитель
   */
  organizationId: string;
  /**
   * Номер РПБ
   */
  passportNumber: number;
  /**
   * Период срочности
   */
  passportPeriod: string;
  /**
   * Способ оплаты
   */
  paymentMethod: string;
  /**
   * Правовая форма на момент регистрации
   */
  registrationAdmFormId: string;
  /**
   * Сигнальное слово
   */
  signalWord: string;
  /**
   * Разово или регулярно
   */
  singleOrMultiple: boolean;
  /**
   * Дата начала ПБ
   */
  startDate: Date;
  /**
   * Статус ПБ
   */
  status: string;
  /**
   * Приостановка ПБ
   */
  suspend: boolean;
  /**
   * Код ТН ВЭД
   */
  tnVedCodeId: string;
  /**
   * Торговое наименование ПБ
   */
  tradeNames: [LocalizationDto];
  /**
   * Дата выполнения работы
   */
  workDate: Date;
  /**
   * Организация посредник
   */
  mediatorId?: string;
}
