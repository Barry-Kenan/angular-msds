/**
 * Тип объекта для передачи данных по телефонному номеру.
 */
export interface Phone {
  /**
   * Добавочный номер
   */
  addCode?: string;
  /**
   * Код города
   */
  areaCode: string;
  /**
   * Id страны
   */
  countryId: string;
  /**
   * Страна
   */
  countryName: string;
  /**
   * Номер телефона
   */
  phoneNumber: string;
}
