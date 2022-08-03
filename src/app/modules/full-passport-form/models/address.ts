/**
 * Тип данных адреса
 */
export interface Address {
  /**
   * Город
   */
  city: string;
  /**
   * Корпус/строение
   */
  corpsBuilding: string;
  /**
   * Страна
   */
  countryId: string;
  /**
   * Страна
   */
  countryName: string;
  /**
   * Дом
   */
  house: string;
  /**
   * Офис
   */
  office: string;
  /**
   * Другое
   */
  other: string;
  /**
   * Область
   */
  region: string;
  /**
   * Улица
   */
  street: string;
  /**
   * Индекс
   */
  zipCode: string;
}
