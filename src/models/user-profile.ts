/**
 * тип для данных пользователя
 */
export interface UserProfile {
  /**
   * Имя Фамилия
   */
  displayName: string;
  /**
   * email
   */
  email: string;
  /**
   *
   */
  emailAdditional: string | null;
  /**
   *
   */
  emailMainDispatch: string;
  /**
   * Имя
   */
  firstName: string;
  /**
   * id
   */
  id: string;
  /**
   *
   */
  initials: string | null;
  /**
   *
   */
  isConfirmed: boolean;
  /**
   *
   */
  isDeleted: boolean;
  /**
   *
   */
  isMediator: string | null;
  /**
   * Фамилия
   */
  lastName: string;
  /**
   *
   */
  lastUserActivityDate: string | null;
  /**
   *
   */
  organizationId: string | null;
  /**
   *
   */
  patronymic: string;
  /**
   *
   */
  phone: string | null;
  /**
   *
   */
  position: string | null;
  /**
   *
   */
  registrationDate: string | null;
  /**
   *
   */
  roleId: string;
  /**
   *
   */
  subdivision: string | null;
}
