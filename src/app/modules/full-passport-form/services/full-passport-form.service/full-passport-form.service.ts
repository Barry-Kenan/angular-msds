import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/modules/shared/services/request.service/request.service';

/**
 * Сервис для редактирования паспорта
 */

@Injectable({
  providedIn: 'root',
})
export class FullPassportService {
  public data: any;

  private passportId: string;

  private organizationId: string;

  constructor(private router: Router, private requestService: RequestService) {
    this.data = '';
    this.passportId = '';
    this.organizationId = '';
  }

  public setPassport(data: any): void {
    this.data = data;
    this.passportId = data.id;
    console.log(this.data);
    console.log(this.passportId);
    this.router.navigate(['/form2']);
  }

  public setOrganizationId(): any {
    this.requestService.postRPC(this.passportId, 'read_passport').subscribe((res: any) => {
      this.organizationId = res.organizationId;
    });
  }

  public readOrganization(): any {
    this.requestService.postRPC(this.organizationId, 'read_organization');
  }
}
