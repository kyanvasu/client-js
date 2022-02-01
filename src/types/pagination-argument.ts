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
  search?: { [a: string]: any };
}