export const DEFAULT_PAGINATION_ARGUMENT: PaginationArgument = {
  page: 1,
  limit: 10,
  format: false,
}
export interface PaginationArgument {
  page?: number;
  limit?: number;
  sort?: string;
  format?: boolean;
  q?: string;
  relationships?: string;
  text?: string;
}

export interface SearchPaginationArgument extends PaginationArgument {
  text?: string;
}
export interface FindPaginationArgument {
  relationships?: string;
}