import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { ColumnItems } from '../../models/column-items';
import { ColumnName } from '../../models/column-type';
import { Direction } from '../../models/direction';
import { ListPassport } from '../../models/list-passport';

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
      sort: (evt: any) => this.sortChecking(evt, ColumnName.SerialNumber),
    },
    {
      title: 'Дата поступления документов',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.DocumentArrivalDate),
    },
    {
      title: 'Номер ПБ',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.PassportNumber),
    },
    {
      title: 'Наименование',
      width: '8%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.Names),
    },
    {
      title: 'Статус',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.Status),
    },
    {
      title: 'Заявитель',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.Organization),
    },
    {
      title: 'Посредник',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.Mediator),
    },
    {
      title: 'Эксперт',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.ExpertId),
    },
    {
      title: 'Действителен от',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.StartDate),
    },
    {
      title: 'Действителен до',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.EndDate),
    },
    {
      title: 'Дата выполнения работ',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.WorkDate),
    },
    {
      title: 'Код ОКПД 2',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.Okpd2CodeId),
    },
    {
      title: 'Код ТН ВЭД ЕАЭС',
      width: '7%',
      sort: (evt: any) => this.sortChecking(evt, ColumnName.TnVedCodeId),
    },
  ];

  /**
   * количество страниц
   */
  public totalPageCount!: number;

  /**
   * название столбца (для пагинации по последней сортировки)
   */
  public columnForPageChange!: ColumnName;

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
    this.dataService.getListPassport(ColumnName.Status, 1, 0).subscribe((res: any) => {
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
  public sortChecking(direction: string | null, column: ColumnName) {
    const directionVal = direction === 'ascend' ? Direction.ascend : Direction.descend;
    this.dataService.getListPassport(column, directionVal, 0).subscribe((res: any) => {
      this.setData(res);
    });
    this.columnForPageChange = column;
    this.directionForPageChange = directionVal;
  }

  public sort(direction: string | null, column: ColumnName) {
    return this.sortChecking(direction, column);
  }

  /**
   * функция для записи data для заполнения таблицы
   * @param response response
   */
  private setData(response: any) {
    this.listOfData = response.items;
    this.totalPageCount = response.totalCount;
  }
}
