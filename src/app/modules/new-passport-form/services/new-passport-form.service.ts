import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { List } from 'src/app/models/list';
import { Organizations } from 'src/app/modules/new-passport-form/models/organizations';
import { NewPassportForm } from '../models/new-passport-form';
import { NewPassport } from '../models/new-passport';

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

    return this.requestService.postRPC(params, method);
  }

  /**
   * метод для добавления новых паспортов
   * @param passport данные нового паспорта
   * @returns Observable
   */
  public addNewPassport<T>(passport: NewPassportForm): Observable<T> {
    const params: NewPassport = {
      documentArrivalDate: passport.documentArrivalDate,
      names: [{ value: passport.names, lang: 'ru' }],
      organizationId: passport.organizationId,
      singleOrMultiple: passport.singleOrMultiple,
    };
    if (passport.isMediator) {
      params.mediatorId = passport.mediatorId;
    }

    const method = 'create_passport';

    return this.requestService.postRPC<T>([params], method);
  }
}
