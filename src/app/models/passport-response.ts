import { ListPassport } from './list-passport';

export interface PassportResponse {
  jsonrpc: string;
  id: string;
  result: {
    items: Array<ListPassport>;
    totalCount: number;
  };
}
