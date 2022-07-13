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
