export interface FormatedResponse<T> {
  data: T[];
  limit: number;
  page: number;
  total_pages: number;
}