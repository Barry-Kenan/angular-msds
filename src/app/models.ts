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

/**
 *
 */
export interface ListPassport {
  /**
   *
   */
  serialNumber: number;
  documentArrivalDate: string;
  endDate: string;
  id: string;
  names: string;
  okpd2Code: string;
  organization: [
    {
      lang: string;
      value: string;
    }
  ];
  passportNumber: number;
  startDate: string;
  tnVedCode: string;
  workDate: string;
  decline: boolean;
  accepted: boolean;
  createUserId: string;
  status: string;
}

export interface PassportResponse {
  jsonrpc: string;
  id: string;
  result: {
    items: Array<ListPassport>;
    totalCount: number;
  };
}

export type ColumnType =
  | 'serialNumber'
  | 'documentArrivalDate'
  | 'passportNumber'
  | 'names'
  | 'status'
  | 'organization'
  | 'mediator'
  | 'expertId'
  | 'startDate'
  | 'endDate'
  | 'workDate'
  | 'okpd2CodeId'
  | 'tnVedCodeId';

export enum Direction {
  descend = 1,
  ascend = -1,
}
export type DirectionEvent = string | null;

export interface RequestBody {
  id: '384c601d-875d-4797-b50b-ea796a9d4f36';
  jsonrpc: '2.0';
  params: [
    {
      Contains: true;
      ExtraOptions: [
        {
          Name: 'sort';
          Value: '';
        }
      ];
      Pagination: {
        Page: number;
        PageSize: number;
      };
      SearchString: {
        lang: 'ru';
        Value: '';
      };
      TableSortParams: {
        Columns: [
          {
            Column: string;
            Direction: 1 | -1 | null;
          }
        ];
      };
    }
  ];
  method: string;
}
