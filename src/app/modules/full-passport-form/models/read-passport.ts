import { LocalizationDto } from 'src/app/models/localization-dto';

export interface ReadPassport {
  accepted: boolean;
  chemistryNames: [LocalizationDto];
  codeQr: string;
  createUserId: string;
  createUserRoleId: string;
  danger: string;
  decline: boolean;
  documentArrivalDate: Date;
  endDate: Date;
  enterpriseTypes: [string];
  hasFrameworkAgreement: boolean;
  id: string;
  names: [LocalizationDto];
  normativeDocCode: string;
  normativeDocTypeId: string;
  notes: [];
  okpd2CodeId: string;
  organizationId: string;
  passportNumber: number;
  passportPeriod: string;
  paymentMethod: string;
  registrationAdmFormId: string;
  signalWord: string;
  singleOrMultiple: boolean;
  startDate: Date;
  status: string;
  suspend: boolean;
  tnVedCodeId: string;
  tradeNames: [LocalizationDto];
  workDate: Date;
}
