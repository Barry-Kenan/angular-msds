/**
 * тип response
 */
export interface Response<T> {
  jsonrpc: string;
  id: number;
  result: T;
}
