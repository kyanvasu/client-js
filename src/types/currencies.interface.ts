export interface CurrencyInterface {
  id: number;
  country: string;
  currency: string;
  code: string;
  symbol: string;
  created_at?: string;
  updated_at?: string;
  is_deleted?: number; 
}