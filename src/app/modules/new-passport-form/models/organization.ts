import { LocalizationDto } from '../../../models/localization-dto';

/**
 * Данные организации
 */
export interface Organization {
  /**
   * Пользователь согласен добавить|изменить организацию как дубликат существующей.
   */
  asDuplicate: boolean;
  /**
   * Разрешение на редактирование
   */
  editing: number;
  /**
   * Идентификатор организации
   */
  id: string;
  /**
   * ИНН
   */
  innCode: string;
  /**
   * Является сотрудником
   */
  isEmployee: boolean;
  /**
   * Наименование полное
   */
  names: [LocalizationDto];
  /**
   * Код ОКПО
   */
  okpoCode: string;
  /**
   * Литеральный префикс (словарь префиксов)
   */
  prefixId: string;
  /**
   * Числовой префикс
   */
  prefixNum: number;
  /**
   * Дата подачи заявки
   */
  proposalDate: string;
  /**
   * Наименование организации сокращенное
   */
  shortNames: [LocalizationDto];
  /**
   * Статус организации
   */
  status: string;
}
