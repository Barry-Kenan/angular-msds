import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';

/**
 * Сервис для редактирования паспорта
 */

@Injectable({
  providedIn: 'root',
})
export class FullPassportService {
  /**
   * общие параметры для некоторых методов
   */
  public params = [
    {
      searchString: null,
      pagination: null,
      contains: true,
    },
  ];

  constructor(private requestService: RequestService) {}

  /**
   * Метод для чтения данных паспорта
   * @param passportId идентификатор паспорта
   * @returns Observable
   */
  public readPassport(passportId: any): Observable<any> {
    return this.requestService.postRPC([passportId], 'read_passport');
  }

  /**
   * Метод для чтения данных организации
   * @param organizationId идентификатор
   * @returns Observable
   */
  public readOrganization(organizationId: any): Observable<any> {
    return this.requestService.postRPC([organizationId], 'read_organization');
  }

  /**
   *
   * @returns
   */
  public userLastOrgByDate(): Observable<any> {
    return this.requestService.postRPC([], 'user_last_org_by_date');
  }

  /**
   * метод для получения списка предыдущих ПБ
   * @param organizationId идентификатор организации
   * @returns Observable
   */
  public organizationPassport(organizationId: any): Observable<any> {
    return this.requestService.postRPC([organizationId], 'organization_passports');
  }

  /**
   *
   * @returns
   */
  public userApplicativeOrganizations(): Observable<any> {
    return this.requestService.postRPC(this.params, 'user_applicative_organizations');
  }

  /**
   * Метод для получения списка экспертов
   * @returns Observable
   */
  public listExpert(): Observable<any> {
    return this.requestService.postRPC(this.params, 'list-expert');
  }

  /**
   * Метод для получения номера ПБ
   * @param id идентификатор ПБ
   * @returns Observable
   */
  public getNextNumber(id: any): Observable<any> {
    return this.requestService.postRPC([id], 'get_next_number');
  }

  /**
   * Метод для получения списков НД, ОКПД2, ТН ВЭД
   * @param param SystemDictsOKPD2, SystemDictsTNVED, SystemDictsDocumentNormativeType
   * @returns Observable
   */
  public listDictionaryValue(param: string): Observable<any> {
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
