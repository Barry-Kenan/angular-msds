import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnItems } from '../../../../../models/column-items';
import { ColumnName } from '../../../../../models/column-name';
import { Direction } from '../../../../../models/direction';
import { Passport } from '../../../../../models/passport';
import { statusColorGreen, statusColorRed } from '../../consts/status-color';
import { statusName } from '../../consts/status-name';
import { tableConst } from '../../consts/table.consts';
import { TableService } from '../../services/table.service/table.service';

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
   * Map статуса в таблице
   */
  public statusName: Map<string, string>;

  /**
   * data для заполнения таблицы
   */
  public listOfData: Array<Passport>;

  /**
   * список столбцов (название, ширина, функция для сортировки)
   */
  public listOfColumn: Array<ColumnItems>;

  /**
   * количество страниц
   */
  public totalPageCount!: number;

  /**
   * название столбца (для пагинации по последней сортировки)
   */
  public columnForPageChange: ColumnName;

  /**
   * direction (для пагинации по последней сортировки)
   */
  public directionForPageChange!: Direction;

  constructor(public tableService: TableService, private router: Router) {
    // присваивание статуса
    this.statusName = statusName;
    // присвоение данных таблицы
    this.listOfData = [];
    // значение для пагинации
    this.columnForPageChange = ColumnName.Status;
    //  присвоение функций и данных для столбцов
    this.listOfColumn = tableConst.map(item => ({
      ...item,
      sort: (evt: any) => this.sortChecking(evt, item.columnName),
    }));
  }

  /**
   * trackBy для *ngfor (чтобы не отрисовал каждый раз)
   * @param _ индекс
   * @param item название столбцов
   * @returns item.title как ключ
   */
  public trackByName(_: number, item: ColumnItems): string {
    return item.title;
  }

  /**
   * навигация (переход н форму для создание ПБ)
   */
  public navigate(): void {
    this.router.navigate(['/form']);
  }

  public ngOnInit(): void {
    this.tableService.getListPassport(ColumnName.Status, 1, 0).subscribe((res: any) => {
      this.setData(res);
    });
  }

  /**
   * для пагинации
   * @param evt страницы (от 1 начинается)
   */
  public pageChange(evt: number): void {
    this.tableService
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
  public sortChecking(direction: string, column: ColumnName): void {
    const directionVal = direction === 'ascend' ? Direction.ascend : Direction.descend;
    this.tableService.getListPassport(column, directionVal, 0).subscribe((res: any) => {
      this.setData(res);
    });
    this.columnForPageChange = column;
    this.directionForPageChange = directionVal;
  }

  /**
   * условия для изменения цвета статуса в таблице
   * @param status data.status
   * @returns string(green, red, yellow)
   */
  public classColor(status: string): string {
    // проверка массивов на совпадение
    const isGreen = statusColorGreen.map(item => statusName.get(item)).includes(status);
    const isRed = statusColorRed.map(item => statusName.get(item)).includes(status);

    if (isGreen) {
      return 'green';
    }
    if (isRed) {
      return 'red';
    }

    return 'yellow';
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
