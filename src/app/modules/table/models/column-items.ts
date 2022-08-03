import { ColumnName } from '../enums/column-name';

/*
 * тип для списка столбцов
 */
export interface ColumnItems {
  /**
   * Название для отображение колонок
   */
  title: string;
  /**
   * Ширина столбцов
   */
  width: string;
  /**
   * Название колонок
   */
  columnName: ColumnName;
  /**
   * Функция для сортировки колонок
   */
  sort?: Function;
}
