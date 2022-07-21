import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TableComponent } from './components/table.component/table.component';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, NzTableModule, NzPaginationModule, NzGridModule, NzButtonModule, NzTypographyModule],
})
export class TableModule {}
