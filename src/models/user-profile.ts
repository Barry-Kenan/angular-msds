/**
 * тип для данных пользователя
 */
export interface UserProfile {
  /**
   * имя фамилия
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
   * имя
   */
  firstName: string;
  /**
   * Id
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
   * фамилия
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
  /**
   *
   */
}
