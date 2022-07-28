import { LocalizationDto } from 'src/app/models/localization-dto';

/**
 * Тип для item НД, Код ОКПД2, Код ТН ВЭД ЕАЭС
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
