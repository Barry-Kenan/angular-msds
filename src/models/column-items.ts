import { ColumnName } from './column-name';

/*
 * тип для списка столбцов
 */
export interface ColumnItems {
  title: string;
  width: string;
  columnName: ColumnName;
  sort?: Function;
}
