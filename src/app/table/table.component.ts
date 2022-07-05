import { Component, OnInit } from '@angular/core';
import { ListPassport } from '../modules';
import { PassportService } from '../passport.service';

/* список ПБ  */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(public passportService: PassportService) {};
  private totalPageCount: number = 0;
  ngOnInit(): void {
    this.passportService.getListPassport().subscribe((res: any) => {
      this.listOfData = res.result.items;
      this.totalPageCount = res.result.totalCount
      this.listOfData.map((e, i) => (e.number = i + 1));
    });
  }

  listOfData: Array<ListPassport> = [];

  sortNumber = (a: ListPassport,b: ListPassport):number => a.number - b.number;
  
}
