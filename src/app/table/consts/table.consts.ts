import { ColumnItems } from 'src/app/models/column-items';
import { ColumnName } from 'src/app/models/column-name';

export const tableConst: Array<ColumnItems> = [
  {
    title: '№',
    width: '3%',
    columnName: ColumnName.SerialNumber,
  },
  {
    title: 'Дата поступления документов',
    width: '7%',
    columnName: ColumnName.DocumentArrivalDate,
  },
  {
    title: 'Номер ПБ',
    width: '7%',
    columnName: ColumnName.PassportNumber,
  },
  {
    title: 'Наименование',
    width: '8%',
    columnName: ColumnName.Names,
  },
  {
    title: 'Статус',
    width: '7%',
    columnName: ColumnName.Status,
  },
  {
    title: 'Заявитель',
    width: '7%',
    columnName: ColumnName.Organization,
  },
  {
    title: 'Посредник',
    width: '7%',
    columnName: ColumnName.Mediator,
  },
  {
    title: 'Эксперт',
    width: '7%',
    columnName: ColumnName.ExpertId,
  },
  {
    title: 'Действителен от',
    width: '7%',
    columnName: ColumnName.StartDate,
  },
  {
    title: 'Действителен до',
    width: '7%',
    columnName: ColumnName.EndDate,
  },
  {
    title: 'Дата выполнения работ',
    width: '7%',
    columnName: ColumnName.WorkDate,
  },
  {
    title: 'Код ОКПД 2',
    width: '7%',
    columnName: ColumnName.Okpd2CodeId,
  },
  {
    title: 'Код ТН ВЭД ЕАЭС',
    width: '7%',
    columnName: ColumnName.TnVedCodeId,
  },
];

//   export const listofColumn: Array<Column> = [
//     {
//       title: '№',
//       width: '3%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.SerialNumber),
//     },
//     {
//       title: 'Дата поступления документов',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.DocumentArrivalDate),
//     },
//     {
//       title: 'Номер ПБ',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.PassportNumber),
//     },
//     {
//       title: 'Наименование',
//       width: '8%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.Names),
//     },
//     {
//       title: 'Статус',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.Status),
//     },
//     {
//       title: 'Заявитель',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.Organization),
//     },
//     {
//       title: 'Посредник',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.Mediator),
//     },
//     {
//       title: 'Эксперт',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.ExpertId),
//     },
//     {
//       title: 'Действителен от',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.StartDate),
//     },
//     {
//       title: 'Действителен до',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.EndDate),
//     },
//     {
//       title: 'Дата выполнения работ',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.WorkDate),
//     },
//     {
//       title: 'Код ОКПД 2',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.Okpd2CodeId),
//     },
//     {
//       title: 'Код ТН ВЭД ЕАЭС',
//       width: '7%',
//       sort: (evt: any) => this.sortChecking(evt, ColumnName.TnVedCodeId),
//     },
//   ];
