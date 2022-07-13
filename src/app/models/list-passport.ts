export interface ListPassport {
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
  mediator: string;
  expert: string;
  startDate: string;
  tnVedCode: string;
  workDate: string;
  decline: boolean;
  accepted: boolean;
  createUserId: string;
  status: string;
}
