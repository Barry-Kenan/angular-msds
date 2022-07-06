import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ColumnType, Direction } from './modules';

@Injectable({
  providedIn: 'root',
})
export class PassportService {
  private url = 'https://iap_dev2.tomskasu.ru/api/worker/list_passport';
  
  
  constructor(private http: HttpClient, private router: Router) {}
  
  
  private body=(column:ColumnType, direction:1|-1, page:number)=>{
    return {
      id: '384c601d-875d-4797-b50b-ea796a9d4f36',
      jsonrpc: '2.0',
      params: [
        {
          Contains: true,
          ExtraOptions: [
            {
              Name: 'sort',
              Value: '',
            },
          ],
          Pagination: {
            Page: page,
            PageSize: 10,
          },
          SearchString: {
            lang: 'ru',
            Value: '',
          },
          TableSortParams: {
            Columns: [
              {
                Column: column,
                Direction: direction,
              },
            ],
          },
        },
      ],
      method: 'list_passport',
    }
  };
  
  

  public getListPassport(column:ColumnType, direction: Direction, page:number) {
    return this.http.post(this.url, this.body(column,direction, page));
  }
 
}
