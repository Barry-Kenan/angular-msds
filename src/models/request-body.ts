/**
 * тип тело для запросов
 */
export interface RequestBody {
  id: '384c601d-875d-4797-b50b-ea796a9d4f36';
  jsonrpc: '2.0';
  params: [
    {
      contains: true;
      extraOptions: [
        {
          name: 'sort';
          value: '';
        }
      ];
      pagination: {
        page: number;
        pageSize: number;
      };
      searchString: {
        lang: 'ru';
        value: '';
      };
      tableSortParams: {
        columns: [
          {
            column: string;
            direction: 1 | -1 | null;
          }
        ];
      };
    }
  ];
  method: string;
}
