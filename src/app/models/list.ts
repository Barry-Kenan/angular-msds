/**
 * результат запроса
 */
export interface List<T> {
  /**
   * массив элементов
   */
  items: Array<T>;
  /**
   * количество элементов
   */
  totalCount: number;
}
