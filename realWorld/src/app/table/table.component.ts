import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  //providers: [DataService],
})
export class TableComponent  {
  items: string[] = [];
  name: string = '';
  // constructor(private dataService: DataService) {}

  // addItem(name: string) {
  //   this.dataService.addData(name);
  //   this.name = ''
  // }
  // ngOnInit() {
  //   this.items = this.dataService.getData();
  // }
}
