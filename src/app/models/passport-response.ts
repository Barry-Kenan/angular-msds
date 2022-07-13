import { ListPassport } from './list-passport';

/**
 * тип response
 */
export interface PassportResponse {
  jsonrpc: string;
  id: string;
  result: {
    items: Array<ListPassport>;
    totalCount: number;
  };
}
