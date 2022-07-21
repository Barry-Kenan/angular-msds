import { List } from './list';

/**
 * тип response
 */
export interface PassportResponse<T> {
  jsonrpc: string;
  id: number;
  result: List<T>;
}
