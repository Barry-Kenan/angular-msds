/**
 * Следующий номер ПБ
 */
export interface NextNumber {
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
