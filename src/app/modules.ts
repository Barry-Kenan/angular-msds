export interface User {
  userName: string;
  password: string;
  remember: boolean;
}

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

export interface ListPassport {
  number: number;
  documentArrivalDate: string;
  endDate: string;
  id: string;
  names: string;
  okpd2Code: string;
  organization: [{
    lang: string;
    value: string;
  }]
  passportNumber: number;
  startDate: string;
  tnVedCode: string;
  workDate: string;
  decline: boolean;
  accepted: boolean;
  createUserId: string;
  status: string;
}


export interface PassportResponse{
  jsonrpc: string;
  id: string;
  result: {
    items: Array<ListPassport>;
    totalCount: number
  }
}