import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ColumnType, Direction, DirectionEvent, ListPassport } from '../models';

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

  public totalPageCount!: number;

  public columnForPageChange!: ColumnType;

  public directionForPageChange!: 1 | -1;

  constructor(public dataService: DataService) {
    this.listOfData = [];
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

  public sortChecking(column: ColumnType, direction: string | null, pageSize: number) {
    const directionVal = direction === 'ascend' ? Direction.ascend : Direction.descend;
    this.dataService.getListPassport(column, directionVal, pageSize).subscribe((res: any) => {
      this.setData(res);
    });
    this.columnForPageChange = column;
    this.directionForPageChange = directionVal;
  }

  public sortSerialNumber(direction: DirectionEvent) {
    this.sortChecking('serialNumber', direction, 0);
  }

  public sortDocumentArrivalDate(direction: DirectionEvent) {
    this.sortChecking('documentArrivalDate', direction, 0);
  }

  public sortPassportNumber(direction: DirectionEvent) {
    this.sortChecking('passportNumber', direction, 0);
  }

  public sortNames(direction: DirectionEvent) {
    this.sortChecking('names', direction, 0);
  }

  public sortStatus(direction: DirectionEvent) {
    this.sortChecking('status', direction, 0);
  }

  public sortOrganization(direction: DirectionEvent) {
    this.sortChecking('organization', direction, 0);
  }

  public sortMediator(direction: DirectionEvent) {
    this.sortChecking('mediator', direction, 0);
  }

  public sortExpertId(direction: DirectionEvent) {
    this.sortChecking('expertId', direction, 0);
  }

  public sortStartDate(direction: DirectionEvent) {
    this.sortChecking('startDate', direction, 0);
  }

  public sortEndDate(direction: DirectionEvent) {
    this.sortChecking('endDate', direction, 0);
  }

  public sortWorkDate(direction: DirectionEvent) {
    this.sortChecking('workDate', direction, 0);
  }

  public sortOkpd2CodeId(direction: DirectionEvent) {
    this.sortChecking('okpd2CodeId', direction, 0);
  }

  public sortTnVedCodeId(direction: DirectionEvent) {
    this.sortChecking('tnVedCodeId', direction, 0);
  }

  private setData(response: any) {
    this.listOfData = response.result.items;
    this.totalPageCount = response.result.totalCount;
    this.listOfData.forEach((e, ind) => {
      e.serialNumber = ind + 1;
    });
  }
}
