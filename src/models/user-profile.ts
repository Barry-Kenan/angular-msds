/**
 * тип для данных пользователя
 */
export interface UserProfile {
  displayName: string; // Имя Фамилия
  email: string; // email
  emailAdditional: string | null; //
  emailMainDispatch: string; //
  firstName: string; // Имя
  id: string; // id
  initials: string | null; //
  isConfirmed: boolean; //
  isDeleted: boolean; //
  isMediator: string | null; //
  lastName: string; // Фамилия
  lastUserActivityDate: string | null; //
  organizationId: string | null; //
  patronymic: string; //
  phone: string | null; //
  position: string | null; //
  registrationDate: string | null; //
  roleId: string; //
  subdivision: string | null; //
}
