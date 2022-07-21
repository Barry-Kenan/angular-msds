import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { List } from 'src/models/list';
import { NewPassport } from 'src/models/new-passport';
import { NewPassportForm } from 'src/models/new-passport-form';
import { Organizations } from 'src/models/organizations';

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
   * @param passport
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
