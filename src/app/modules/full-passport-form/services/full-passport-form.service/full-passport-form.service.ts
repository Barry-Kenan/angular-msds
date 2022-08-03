import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'src/app/models/list';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';
import { Expert } from '../../models/expert';
import { NextNumber } from '../../models/next-number';
import { DictionaryValueItem } from '../../models/dictionary-value-item';
import { OrganizationFull } from '../../models/organization-full';
import { Passport } from '../../models/passport';

/**
 * Сервис для редактирования паспорта
 */

@Injectable({
  providedIn: 'root',
})
export class FullPassportService {
  constructor(private requestService: RequestService) {}

  /**
   * Метод для чтения данных паспорта
   * @param passportId идентификатор паспорта
   * @returns Observable
   */
  public readPassport(passportId: string | undefined): Observable<Passport> {
    return this.requestService.postRPC([passportId], 'read_passport');
  }

  /**
   * Метод для чтения данных организации
   * @param organizationId идентификатор
   * @returns Observable
   */
  public readOrganization(organizationId: string): Observable<OrganizationFull> {
    return this.requestService.postRPC([organizationId], 'read_organization');
  }

  /**
   * метод для получения списка предыдущих ПБ
   * @param organizationId идентификатор организации
   * @returns Observable
   */
  public organizationPassport(organizationId: string): Observable<any> {
    return this.requestService.postRPC([organizationId], 'organization_passports');
  }

  /**
   * Метод для получения списка экспертов
   * @returns Observable
   */
  public listExpert(): Observable<List<Expert>> {
    const params = {
      searchString: null,
      pagination: null,
      contains: true,
    };

    return this.requestService.postRPC([params], 'list-expert');
  }

  /**
   * Метод для получения номера ПБ
   * @param id идентификатор ПБ
   * @returns Observable
   */
  public getNextNumber(id: string | undefined): Observable<NextNumber> {
    return this.requestService.postRPC([id], 'get_next_number');
  }

  /**
   * Метод для редактирование ПБ
   * @param passport объект для заполнения ПБ
   * @returns Observable
   */
  public updatePassport<T>(passport: Passport): Observable<T> {
    const params: Passport = {
      ...passport,
    };

    const method = 'update_passport';

    return this.requestService.postRPC<T>([params], method);
  }

  /**
   * Метод для получения списков НД, ОКПД2, ТН ВЭД
   * @param param SystemDictsOKPD2, SystemDictsTNVED, SystemDictsDocumentNormativeType
   * @returns Observable
   */
  public listDictionaryValue(param: string): Observable<List<DictionaryValueItem>> {
    const params = [
      param,
      {
        contains: true,
        pagination: null,
        searchString: null,
        showOnlyActivated: null,
        tableSortParams: null,
      },
    ];

    return this.requestService.postRPC(params, 'list_dictionary-value');
  }
}
