import { Names } from './names';
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
  names: [Names];
  /**
   * Заявитель
   */
  organizationId: string;
  /**
   * Регулярность
   */
  singleOrMultiple: boolean;
}
