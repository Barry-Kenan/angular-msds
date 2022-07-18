import { Passport } from './passport';
import { List } from './list';

/**
 * тип response
 */
export interface PassportResponse {
  jsonrpc: string;
  id: number;
  result: List<Passport>;
}
