import { LocalizationDto } from 'src/app/models/localization-dto';

/**
 * Тип словарного значения
 */
export interface DictionaryValueItem {
  /**
   * деактивирован
   */
  deactivate: boolean;
  /**
   * Идентификатор
   */
  id: string;
  /**
   * Наименование
   */
  names: Array<LocalizationDto>;
}
