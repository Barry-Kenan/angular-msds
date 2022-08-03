import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { List } from 'src/app/models/list';
import { Organization } from 'src/app/modules/new-passport-form/models/organization';
import { NewPassportForm } from '../models/new-passport-form';
import { NewPassport } from '../models/new-passport';

/**
 * Сервис для новых паспортов
 */

@Injectable({
  providedIn: 'root',
})
export class NewPassportFormService {
  constructor(private requestService: RequestService) {}

  /**
   * Метод для получения Организаций
   * @returns Observable
   */
  public getOrganizations(): Observable<List<Organization>> {
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
      ...passport,
      names: [{ value: passport.names, lang: 'ru' }],
    };
    if (passport.isMediator) {
      params.mediatorId = passport.mediatorId;
    }

    const method = 'create_passport';

    return this.requestService.postRPC<T>([params], method);
  }
}
