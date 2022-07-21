/**
 * тип для формы новый ПБ
 */
export interface NewPassportForm {
  /**
   * Дата поступления документа
   */
  documentArrivalDate: string;
  /**
   * Checkbox Посредник
   */
  isMediator: boolean;
  /**
   * Посредник
   */
  mediatorId?: string;
  /**
   * Техническое наименование
   */
  names: string;
  /**
   * Заявитель
   */
  organizationId: string;
  /**
   * Регулярность
   */
  singleOrMultiple: boolean;
}
