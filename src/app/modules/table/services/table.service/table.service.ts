import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { List } from 'src/app/models/list';
import { Passport } from 'src/app/modules/table/models/passport';
import { statusName } from '../../consts/status-name';
import { Direction } from '../../enums/direction';
import { ColumnName } from '../../enums/column-name';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private requestService: RequestService) {}

  /**
   * метод для получения списка ПБ
   * @param column столбцы
   * @param direction 1 | -1
   * @param page страницы от 0
   * @returns объект с items и totalCount
   */
  public getListPassport(column: ColumnName, direction: Direction, page: number): Observable<List<Passport>> {
    const params = [
      {
        contains: true,
        extraOptions: [
          {
            name: 'sort',
            value: '',
          },
        ],
        pagination: {
          page,
          pageSize: 10,
        },
        searchString: {
          lang: 'ru',
          value: '',
        },
        tableSortParams: {
          columns: [
            {
              column,
              direction,
            },
          ],
        },
      },
    ];
    const method = 'list_passport';

    return this.requestService.postRPC<List<Passport>>(params, method).pipe(
      map((res: List<Passport>) => {
        const { totalCount } = res;
        const items = res.items.map((item: Passport, index: number) => {
          const test = item;
          test.serialNumber = index + 1 + page * 10;
          test.status = statusName.get(item.status) || '';

          return test;
        });

        return { items, totalCount };
      })
    );
  }
}
