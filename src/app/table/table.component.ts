import { Component, OnInit } from '@angular/core';
import { ColumnType, Direction, DirectionEvent, ListPassport } from '../modules';
import { PassportService } from '../passport.service';

/* список ПБ  */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public totalPageCount!: number;
  public listOfData: Array<ListPassport> = [];
  public columnForPageChange! : ColumnType;
  public directionForPageChange! : 1|-1;

  private setData(response: any) {
    this.listOfData = response.result.items;
    this.totalPageCount = response.result.totalCount;
    this.listOfData.map((e, i) => (e.serialNumber = i + 1));
  }

  constructor(public passportService: PassportService) {
  }

  ngOnInit(): void {
    this.passportService
      .getListPassport('status', 1, 0)
      .subscribe((res: any) => {
        this.setData(res);
      });
  }

  pageChange(evt: any) {
    this.passportService
      .getListPassport(this.columnForPageChange, this.directionForPageChange, evt-1)
      .subscribe((res: any) => {
        this.setData(res);
      });
  }

  sortChecking(column: ColumnType, direction: string | null, pageSize: number) {
    const directionVal =
      direction === 'ascend' ? Direction.ascend : Direction.descend;
    this.passportService
      .getListPassport(column, directionVal, pageSize)
      .subscribe((res: any) => {
        this.setData(res);
      });
    this.columnForPageChange = column;
    this.directionForPageChange = directionVal
  }

  sortSerialNumber(direction: DirectionEvent) {
    this.sortChecking('serialNumber', direction, 0);
  }
  sortDocumentArrivalDate(direction: DirectionEvent) {
    this.sortChecking('documentArrivalDate', direction, 0);
  }
  sortPassportNumber(direction: DirectionEvent) {
    this.sortChecking('passportNumber', direction, 0);
  }
  sortNames(direction: DirectionEvent) {
    this.sortChecking('names', direction, 0);
  }
  sortStatus(direction: DirectionEvent) {
    this.sortChecking('status', direction, 0);
  }
  sortOrganization(direction: DirectionEvent) {
    this.sortChecking('organization', direction, 0);
  }
  sortMediator(direction: DirectionEvent) {
    this.sortChecking('mediator', direction, 0);
  }
  sortExpertId(direction: DirectionEvent) {
    this.sortChecking('expertId', direction, 0);
  }
  sortStartDate(direction: DirectionEvent) {
    this.sortChecking('startDate', direction, 0);
  }
  sortEndDate(direction: DirectionEvent) {
    this.sortChecking('endDate', direction, 0);
  }
  sortWorkDate(direction: DirectionEvent) {
    this.sortChecking('workDate', direction, 0);
  }
  sortOkpd2CodeId(direction: DirectionEvent) {
    this.sortChecking('okpd2CodeId', direction, 0);
  }
  sortTnVedCodeId(direction: DirectionEvent) {
    this.sortChecking('tnVedCodeId', direction, 0);
  }
}
