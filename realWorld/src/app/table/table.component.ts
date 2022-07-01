import { Component } from '@angular/core';

interface DataItem {
  n: number,
  dataPostupleniya: string,
  nomerPB: number,
  status: number,
  naimenovaniye: number,
  zayavitel: string,
  posrednik: string,
  ekspert: string,
  deystvitelenOt: string,
  deystvitelenDo: string,
  kodOkppd: number,
  kodTnWedEaes: number
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  listOfColumn = [
    {
      title: '№',
      compare: null,
      priority: false
    },
    {
      title: 'Дата поступления документов',
      priority: 3
    },
    {
      title: 'Номер ПБ',
      priority: 2
    },
    {
      title: 'Статус',
      priority: 1
    },
    {
      title: 'Наименование',
      priority: 1
    },
    {
      title: 'Заявитель',
      priority: 1
    },
    {
      title: 'Посредник',
      priority: 1
    },
    {
      title: 'Эксперт',
      priority: 1
    },
    {
      title: 'Действителен от',
      priority: 1
    },
    {
      title: 'Дата выполнения работ',
      priority: 1
    },
    {
      title: 'Код ОКПД 2',
      priority: 1
    },
    {
      title: 'Код ТН ВЭД ЕАЭС',
      priority: 1
    },
  ];
  listOfData: DataItem[] = [
    {
      n: 1,
      dataPostupleniya: 'John Brown',
      nomerPB: 98,
      status: 60,
      naimenovaniye: 70,
      zayavitel: 'asdfasd',
      posrednik: 'asdfasdff',
      ekspert: 'asdf',
      deystvitelenOt: 'dfasdfa',
      deystvitelenDo: 'asdfasd',
      kodOkppd: 231,
      kodTnWedEaes: 123
    },
    {
      n: 2,
      dataPostupleniya: 'John Brown',
      nomerPB: 98,
      status: 60,
      naimenovaniye: 70,
      zayavitel: 'asdfasd',
      posrednik: 'asdfasdff',
      ekspert: 'asdf',
      deystvitelenOt: 'dfasdfa',
      deystvitelenDo: 'asdfasd',
      kodOkppd: 231,
      kodTnWedEaes: 123
    },
    {
      n: 3,
      dataPostupleniya: 'John Brown',
      nomerPB: 98,
      status: 60,
      naimenovaniye: 70,
      zayavitel: 'asdfasd',
      posrednik: 'asdfasdff',
      ekspert: 'asdf',
      deystvitelenOt: 'dfasdfa',
      deystvitelenDo: 'asdfasd',
      kodOkppd: 231,
      kodTnWedEaes: 123
    },
  ];
}
