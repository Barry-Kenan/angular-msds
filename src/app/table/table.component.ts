import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ColumnItems } from '../models/column-items';
import { ColumnType } from '../models/column-type';
import { Direction } from '../models/direction';
import { ListPassport } from '../models/list-passport';

/**
 * список ПБ
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public listOfData: Array<ListPassport>;

  public listOfColumn: Array<ColumnItems> = [
    {
      title: '№',
      sort: (evt: any) => this.sortChecking(evt, 'serialNumber'),
    },
    {
      title: 'Дата поступления документов',
      sort: (evt: any) => this.sortChecking(evt, 'documentArrivalDate'),
    },
    {
      title: 'Номер ПБ',
      sort: (evt: any) => this.sortChecking(evt, 'passportNumber'),
    },
    {
      title: 'Наименование',
      sort: (evt: any) => this.sortChecking(evt, 'names'),
    },
    {
      title: 'Статус',
      sort: (evt: any) => this.sortChecking(evt, 'status'),
    },
    {
      title: 'Заявитель',
      sort: (evt: any) => this.sortChecking(evt, 'organization'),
    },
    {
      title: 'Посредник',
      sort: (evt: any) => this.sortChecking(evt, 'mediator'),
    },
    {
      title: 'Эксперт',
      sort: (evt: any) => this.sortChecking(evt, 'expertId'),
    },
    {
      title: 'Действителен от',
      sort: (evt: any) => this.sortChecking(evt, 'startDate'),
    },
    {
      title: 'Действителен до',
      sort: (evt: any) => this.sortChecking(evt, 'endDate'),
    },
    {
      title: 'Дата выполнения работ',
      sort: (evt: any) => this.sortChecking(evt, 'workDate'),
    },
    {
      title: 'Код ОКПД 2',
      sort: (evt: any) => this.sortChecking(evt, 'okpd2CodeId'),
    },
    {
      title: 'Код ТН ВЭД ЕАЭС',
      sort: (evt: any) => this.sortChecking(evt, 'tnVedCodeId'),
    },
  ];

  public totalPageCount!: number;

  public columnForPageChange!: ColumnType;

  public directionForPageChange!: 1 | -1;

  constructor(public dataService: DataService, private router: Router) {
    this.listOfData = [];
  }

  public trackByName(_: number, item: ColumnItems): string {
    return item.title;
  }

  public navigate() {
    this.router.navigate(['/form']);
  }

  public ngOnInit(): void {
    this.dataService.getListPassport('status', 1, 0).subscribe((res: any) => {
      this.setData(res);
    });
  }

  public pageChange(evt: any) {
    this.dataService
      .getListPassport(this.columnForPageChange, this.directionForPageChange, evt - 1)
      .subscribe((res: any) => {
        this.setData(res);
      });
  }

  public sortChecking(direction: string | null, column: ColumnType) {
    const directionVal = direction === 'ascend' ? Direction.ascend : Direction.descend;
    this.dataService.getListPassport(column, directionVal, 0).subscribe((res: any) => {
      this.setData(res);
    });
    this.columnForPageChange = column;
    this.directionForPageChange = directionVal;
  }

  private setData(response: any) {
    this.listOfData = response.result.items;
    this.totalPageCount = response.result.totalCount;
    this.listOfData.forEach((e, ind) => {
      e.serialNumber = ind + 1;
      switch (e.status) {
        case '0': {
          this.listOfData[ind].status = 'Черновик заявки';
          break;
        }
        case '1': {
          this.listOfData[ind].status = 'Заявка на рассмотрении';
          break;
        }
        case '2': {
          this.listOfData[ind].status = 'На уточнении';
          break;
        }
        case '3': {
          this.listOfData[ind].status = 'Ожидание оплаты и договора';
          break;
        }
        case '4': {
          this.listOfData[ind].status = 'Ожидание договора';
          break;
        }
        case '5': {
          this.listOfData[ind].status = 'Подтверждение договора';
          break;
        }
        case '6': {
          this.listOfData[ind].status = 'Ожидание оплаты и подтверждения договора';
          break;
        }
        case '7': {
          this.listOfData[ind].status = 'Ожидание оплаты';
          break;
        }
        case '8': {
          this.listOfData[ind].status = 'На экспертизе';
          break;
        }
        case '9': {
          this.listOfData[ind].status = 'Отказ';
          break;
        }
        case '10': {
          this.listOfData[ind].status = 'На экспертизе(2я редакция)';
          break;
        }
        case '11': {
          this.listOfData[ind].status = 'На экспертизе(3я редакция)';
          break;
        }
        case '12': {
          this.listOfData[ind].status = 'окончательный отказ';
          break;
        }
        case '13': {
          this.listOfData[ind].status = 'Зарегистрирован (ожидание оригиналов)';
          break;
        }
        case '14': {
          this.listOfData[ind].status = 'окончательно зарегистрирован';
          break;
        }
        case '15': {
          this.listOfData[ind].status = 'sadfas';
          break;
        }
        case '16': {
          this.listOfData[ind].status = 'sadfas';
          break;
        }
        case '17': {
          this.listOfData[ind].status = 'Приостановлен';
          break;
        }
        case '18':
          this.listOfData[ind].status = 'Повторный отказ';
          break;
        default:
          break;
      }
    });
  }
}
