import { Names } from './names';

export interface Organizations {
  asDuplicate: boolean;
  editing: number;
  id: string;
  innCode: string;
  isEmployee: boolean;
  names: [Names];
  okpoCode: string;
  prefixId: string;
  prefixNum: number;
  proposalDate: string;
  shortNames: [Names];
  status: string;
}
