/**
 * Тип получения следующего номера ПБ
 */
export interface GetNextNumber {
  /**
   * Номер ПБ
   */
  number: number;
  /**
   * дата получения номера
   */
  reservationDate: Date;
  /**
   * Идентификатор пользователя
   */
  userId: string;
}
