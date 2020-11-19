declare namespace API {
  export interface ResponseData<T> {
    data: T;
    response: Response;
  }

  export interface TableResponseData<T> {
    data: {
      total: number;
      data: T[];
    };
    response: Response;
  }

  export interface Pagination {
    page?: number;
    pageSize?: number;
  }

  export interface TableParams {
    current?: number;
    pageSize?: number;
    [propName: string]: any;
  }

  export interface ModifyParams {
    [propName: string]: any;
  }

  export interface IValueEnum {
    [key: string]:
      | React.ReactNode
      | {
          text: React.ReactNode;
          status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
        };
  }

  export type SelectOptions = Array<{
    value: string;
    label: string;
    enabled?: boolean;
  }>;
}
