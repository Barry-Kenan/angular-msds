/**
 * тип для данных пользователя
 */
export interface UserProfile {
  displayName: string;
  email: string;
  emailAdditional: string | null;
  emailMainDispatch: string;
  firstName: string;
  id: string;
  initials: string | null;
  isConfirmed: boolean;
  isDeleted: boolean;
  isMediator: string | null;
  lastName: string;
  lastUserActivityDate: string | null;
  organizationId: string | null;
  patronymic: string;
  phone: string | null;
  position: string | null;
  registrationDate: string | null;
  roleId: string;
  subdivision: string | null;
}
