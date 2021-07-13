export interface KanvasFormatedResponse<T> {
  data: T[];
  limit: number;
  page: number;
  total_pages: number;
}