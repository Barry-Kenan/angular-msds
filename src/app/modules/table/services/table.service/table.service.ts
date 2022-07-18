import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { ColumnName } from 'src/models/column-name';
import { Direction } from 'src/models/direction';
import { List } from 'src/models/list';
import { Passport } from 'src/models/passport';
import { PassportResponse } from 'src/models/passport-response';
import { UserProfile } from 'src/models/user-profile';
import { statusName } from '../../consts/status-name';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class TableService {
  /**
   * user data пользователя
   */
  public userProfileData!: UserProfile;

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

    return this.requestService.postRPC<PassportResponse>(params, method).pipe(
      map((res: PassportResponse) => {
        const { totalCount } = res.result;
        const items = res.result.items.map((item: Passport, index: number) => {
          const test = item;
          test.serialNumber = index + 1;
          test.status = statusName.get(item.status) || '';

          return test;
        });

        return { items, totalCount };
      })
    );
  }
}
