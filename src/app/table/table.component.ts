import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ColumnItems } from '../models/column-items';
import { Column } from '../models/column-type';
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
  /**
   * data для заполнения таблицы
   */
  public listOfData: Array<ListPassport>;

  /**
   * список столбцов (название, ширина, функция для сортировки)
   */
  public listOfColumn: Array<ColumnItems> = [
    {
      title: '№',
      width: '3%',
      sort: (evt: any) => this.sortChecking(evt, 'serialNumber'),
    },
    {
      title: 'Дата поступления документов',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'documentArrivalDate'),
    },
    {
      title: 'Номер ПБ',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'passportNumber'),
    },
    {
      title: 'Наименование',
      width: '8%',
      sort: (evt: any) => this.sortChecking(evt, 'names'),
    },
    {
      title: 'Статус',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'status'),
    },
    {
      title: 'Заявитель',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'organization'),
    },
    {
      title: 'Посредник',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'mediator'),
    },
    {
      title: 'Эксперт',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'expertId'),
    },
    {
      title: 'Действителен от',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'startDate'),
    },
    {
      title: 'Действителен до',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'endDate'),
    },
    {
      title: 'Дата выполнения работ',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'workDate'),
    },
    {
      title: 'Код ОКПД 2',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'okpd2CodeId'),
    },
    {
      title: 'Код ТН ВЭД ЕАЭС',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, 'tnVedCodeId'),
    },
  ];

  /**
   * количество страниц
   */
  public totalPageCount!: number;

  /**
   * название столбца (для пагинации по последней сортировки)
   */
  public columnForPageChange!: Column;

  /**
   * direction (для пагинации по последней сортировки)
   */
  public directionForPageChange!: 1 | -1;

  constructor(public dataService: DataService, private router: Router) {
    this.listOfData = [];
  }

  /**
   *
   * @param _ индекс
   * @param item название столбцов
   * @returns trackBy для *ngfor (чтобы не отрисовал каждый раз)
   */
  public trackByName(_: number, item: ColumnItems): string {
    return item.title;
  }

  /**
   * навигация (переход н форму для создание ПБ)
   */
  public navigate() {
    this.router.navigate(['/form']);
  }

  public ngOnInit(): void {
    this.dataService.getListPassport('status', 1, 0).subscribe((res: any) => {
      this.setData(res);
    });
  }

  /**
   * для пагинации
   * @param evt страницы (от 1 начинается)
   */
  public pageChange(evt: number) {
    this.dataService
      .getListPassport(this.columnForPageChange, this.directionForPageChange, evt - 1)
      .subscribe((res: any) => {
        this.setData(res);
      });
  }

  /**
   * функция для сортировки
   * @param direction ascend | descend
   * @param column название столбца
   */
  public sortChecking(direction: string | null, column: Column) {
    const directionVal = direction === 'ascend' ? Direction.ascend : Direction.descend;
    this.dataService.getListPassport(column, directionVal, 0).subscribe((res: any) => {
      this.setData(res);
    });
    this.columnForPageChange = column;
    this.directionForPageChange = directionVal;
  }

  /**
   * функция для записи data для заполнения таблицы
   * @param response response)
   */
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
