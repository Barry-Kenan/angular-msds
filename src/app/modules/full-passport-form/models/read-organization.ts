import { LocalizationDto } from 'src/app/models/localization-dto';
import { Address } from './address';
import { Phone } from './phone';

export interface ReadOrganization {
  asDuplicate: boolean;
  directorFIO: string;
  editing: number;
  email: string;
  factAddressEqualPostAddress: boolean;
  foreign: boolean;
  holdingName: string;
  id: string;
  innCode: string;
  isEmployee: boolean;
  kpp: string;
  legalFormId: string;
  names: [LocalizationDto];
  ndtIds: [];
  okpd2Ids: [];
  okpoCode: string;
  okved2Ids: [];
  phone: Phone;
  postAddressEqualUrAddress: boolean;
  prefixId: string;
  prefixNum: number;
  proposalDate: string;
  shortNames: [LocalizationDto];
  status: string;
  urAddress: Address;
}
