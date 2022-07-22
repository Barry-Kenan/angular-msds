import { Names } from './names';

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
  names: [Names];
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
  shortNames: [Names];
  /**
   * Статус организации
   */
  status: string;
}
