import { ColumnItems } from 'src/app/modules/table/models/column-items';
import { ColumnName } from '../models/column-name';
/**
 * данные столбцов таблицы список ПБ(title: название, width: ширина, columName: столбцы)
 */
export const tableConst: Array<ColumnItems> = [
  {
    title: '№',
    width: '72px',
    columnName: ColumnName.SerialNumber,
  },
  {
    title: 'Дата поступления документов',
    width: '120px',
    columnName: ColumnName.DocumentArrivalDate,
  },
  {
    title: 'Номер ПБ',
    width: '108px',
    columnName: ColumnName.PassportNumber,
  },
  {
    title: 'Наименование',
    width: '220px',
    columnName: ColumnName.Names,
  },
  {
    title: 'Статус',
    width: '144px',
    columnName: ColumnName.Status,
  },
  {
    title: 'Заявитель',
    width: '200px',
    columnName: ColumnName.Organization,
  },
  {
    title: 'Посредник',
    width: '180px',
    columnName: ColumnName.Mediator,
  },
  {
    title: 'Эксперт',
    width: '108px',
    columnName: ColumnName.ExpertId,
  },
  {
    title: 'Действителен от',
    width: '125px',
    columnName: ColumnName.StartDate,
  },
  {
    title: 'Действителен до',
    width: '125px',
    columnName: ColumnName.EndDate,
  },
  {
    title: 'Дата выполнения работ',
    width: '115px',
    columnName: ColumnName.WorkDate,
  },
  {
    title: 'Код ОКПД 2',
    width: '113px',
    columnName: ColumnName.Okpd2CodeId,
  },
  {
    title: 'Код ТН ВЭД ЕАЭС',
    width: '110px',
    columnName: ColumnName.TnVedCodeId,
  },
];
