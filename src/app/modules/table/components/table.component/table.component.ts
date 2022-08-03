import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list';
import { ColumnItems } from '../../models/column-items';
import { Passport } from '../../models/passport';
import { statusColorGreen, statusColorRed } from '../../consts/status-color';
import { statusName } from '../../consts/status-name';
import { tableConst } from '../../consts/table.consts';
import { TableService } from '../../services/table.service/table.service';
import { ColumnName } from '../../models/column-name';
import { Direction } from '../../models/direction';

/**
 * список ПБ
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterContentChecked {
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

  constructor(public tableService: TableService, private router: Router, private changeDetector: ChangeDetectorRef) {
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
   * Возвращает наименование если строка больше размера ячейки
   * @param data data.names
   * @param el HtmlElement
   * @returns string
   */
  public dataLength(data: string, el: HTMLElement): string {
    const widthEl = document.querySelector('.dataName')?.clientWidth || 0;
    const widthText = el.getBoundingClientRect().width;
    const returnData = widthEl < widthText ? data : '';

    return returnData;
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
    this.setData(ColumnName.Status, 1, 0);
  }

  /**
   * для пагинации
   * @param evt страницы (от 1 начинается)
   */
  public pageChange(evt: number): void {
    this.setData(this.columnForPageChange, this.directionForPageChange, evt - 1);
  }

  /**
   * функция для сортировки
   * @param direction ascend | descend
   * @param column название столбца
   */
  public sortChecking(direction: string, column: ColumnName): void {
    const directionVal = direction === 'ascend' ? Direction.ascend : Direction.descend;
    this.setData(column, directionVal, 0);
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

  public ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  /**
   * метод для получения и присвоения списка ПБ
   * @param column столбцы
   * @param direction 1 | -1
   * @param page страницы от 0
   */
  private setData(column: ColumnName, direction: Direction, page: number): void {
    this.tableService.getListPassport(column, direction, page).subscribe((response: List<Passport>) => {
      this.listOfData = response.items;
      this.totalPageCount = response.totalCount;
    });
  }
}
