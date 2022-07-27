import { LocalizationDto } from 'src/app/models/localization-dto';

export interface ListDictionaryValueItem {
  deactivate: boolean;
  id: string;
  names: Array<[LocalizationDto]>;
}
