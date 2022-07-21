import { Organization } from './organization';

/**
 * тип списка ПБ
 */
export interface Passport {
  /**
   * Порядковый номер в таблице
   */
  serialNumber: number;
  /**
   * Дата поступления документов
   */
  documentArrivalDate: string;
  /**
   * Действителен до
   */
  endDate: string;
  /**
   * id
   */
  id: string;
  /**
   * Наименование
   */
  names: string;
  /**
   * Код ОКПД 2
   */
  okpd2Code: string;
  /**
   * Заявитель
   */
  organization: [Organization];
  /**
   * Номер ПБ
   */
  passportNumber: number;
  /**
   * Посредник
   */
  mediator: string;
  /**
   * Эксперт
   */
  expert: string;
  /**
   * Действителен от
   */
  startDate: string;
  /**
   * Код ТН ВЭД ЕАЭС
   */
  tnVedCode: string;
  /**
   * Дата выполнения работ
   */
  workDate: string;
  /**
   *
   */
  decline: boolean;
  /**
   *
   */
  accepted: boolean;
  /**
   *
   */
  createUserId: string;
  /**
   * Статус
   */
  status: string;
}
