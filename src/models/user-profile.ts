/**
 * Сущность пользователя
 */
export interface UserProfile {
  /**
   * Отображаемое имя
   */
  displayName: string;
  /**
   * Почта
   */
  email: string;
  /**
   * Дополнительная почта
   */
  emailAdditional: string | null;
  /**
   * Почта для рассылки документов
   */
  emailMainDispatch: string;
  /**
   * Имя
   */
  firstName: string;
  /**
   * Идентификатор
   */
  id: string;
  /**
   * Инициалы
   */
  initials: string | null;
  /**
   * Флаг подтверждения
   */
  isConfirmed: boolean;
  /**
   * Флаг удаления
   */
  isDeleted: boolean;
  /**
   * Является ли пользователь посредником
   */
  isMediator: string | null;
  /**
   * Фамилия
   */
  lastName: string;
  /**
   * Последняя активность
   */
  lastUserActivityDate: string | null;
  /**
   * Организация заявитель
   */
  organizationId: string | null;
  /**
   * Отчество
   */
  patronymic: string;
  /**
   * Телефон пользователя
   */
  phone: string | null;
  /**
   * Должность
   */
  position: string | null;
  /**
   * Дата регистрации
   */
  registrationDate: string | null;
  /**
   * Роль пользователя
   */
  roleId: string;
  /**
   * Подразделение
   */
  subdivision: string | null;
}
