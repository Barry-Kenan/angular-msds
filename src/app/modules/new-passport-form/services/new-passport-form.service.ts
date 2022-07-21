import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { List } from 'src/models/list';
import { NewPassport } from 'src/models/new-passport';
import { Organizations } from 'src/models/organizations';
import { PassportResponse } from 'src/models/passport-response';

/**
 * Сервис для логина
 */

@Injectable({
  providedIn: 'root',
})
export class NewPassportFormService {
  constructor(private requestService: RequestService) {}

  /**
   * Метод для получения Заявителей
   * @returns Observable
   */
  public getOrganizations(): Observable<List<Organizations>> {
    const params = [{ searchString: null, pagination: null, contains: true }];
    const method = 'list_organization';

    return this.requestService.postRPC(params, method).pipe(map((res: any) => res.result));
  }

  /**
   * метод для добавления новых паспортов
   * @param passport
   * @returns Observable
   */
  public addNewPassport(passport: NewPassport): Observable<any> {
    const params: [NewPassport] = [
      {
        documentArrivalDate: passport.documentArrivalDate,
        names: [{ value: passport.names[0].value, lang: 'ru' }],
        organizationId: passport.organizationId,
        singleOrMultiple: passport.singleOrMultiple,
      },
    ];
    if (passport.isMediator) {
      params[0].mediatorId = passport.mediatorId;
    }

    const method = 'create_passport';

    return this.requestService.postRPC<PassportResponse>(params, method);
  }
}
