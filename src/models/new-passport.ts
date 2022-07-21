import { Names } from './names';
/**
 * тип для формы newPassport
 */
export interface NewPassport {
  documentArrivalDate: string;
  isMediator?: boolean;
  mediatorId?: string;
  names: [Names];
  organizationId: string;
  singleOrMultiple: boolean;
}
