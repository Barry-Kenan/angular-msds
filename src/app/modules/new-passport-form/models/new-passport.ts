import { LocalizationDto } from 'src/app/models/localization-dto';

/**
 * тип для формы newPassport
 */
export interface NewPassport {
  /**
   * Дата поступления документа
   */
  documentArrivalDate: string;
  /**
   * Посредник
   */
  mediatorId?: string;
  /**
   * Техническое наименование
   */
  names: [LocalizationDto];
  /**
   * Заявитель
   */
  organizationId: string;
  /**
   * Регулярность
   */
  singleOrMultiple: boolean;
}
