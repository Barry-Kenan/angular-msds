import { LocalizationDto } from 'src/app/models/localization-dto';
import { Address } from './address';
import { Phone } from './phone';

/**
 * Тип объекта для передачи данных по организации
 */
export interface OrganizationFull {
  /**
   * Пользователь согласен добавить|изменить организацию как дубликат существующей
   */
  asDuplicate: boolean;
  /**
   * ФИО
   */
  directorFIO: string;
  /**
   * Разрешение на редактирование
   */
  editing: number;
  /**
   * Адрес электронной почты
   */
  email: string;
  /**
   * Фактический и почтовый адрес соответствуют юридическому
   */
  factAddressEqualPostAddress: boolean;
  /**
   * Иностранная компания
   */
  foreign: boolean;
  /**
   * Наименование Холдинга
   */
  holdingName: string;
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
   * КПП
   */
  kpp: string;
  /**
   * Организационно-правовая форма
   */
  legalFormId: string;
  /**
   * Наименование полное
   */
  names: [LocalizationDto];
  /**
   * Список справочных значений НДТ
   */
  ndtIds: [];
  /**
   * Список ОКПД 2
   */
  okpd2Ids: [];
  /**
   * Код ОКПО
   */
  okpoCode: string;
  /**
   * Список ОКВЭД 2
   */
  okved2Ids: [];
  /**
   * Объект для передачи данных по телефонному номеру
   */
  phone: Phone;
  /**
   * Почтовый адрес соответствует юридическому
   */
  postAddressEqualUrAddress: boolean;
  /**
   * Литеральный префикс
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
  /**
   * Объект для передачи данных по адресу
   */
  urAddress: Address;
}
