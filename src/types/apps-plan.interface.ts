
export interface SubscriptionInterface {
  id: string | number;
  apps_id: number;
  name: string;
  description: string;
  stripe_id: string | number;
  stripe_plan: string;
  pricing: string;
  pricing_annual: string;
  currency_id: number;
  free_trial_dates: number;
  payment_ìnterval: 'monthly' | 'yearly';
  payment_style: 'monthly' | 'yearly';
  is_default: number | boolean;
  payment_frequencies_id: number;
  created_at?: string;
  updated_at?: string;
  is_deleted?: number | boolean;
}

export interface UpdateSubsctiptionInterface {
  stripe_id: string | number;
  payment_style: 'monthly' | 'yearly';
  stripe_plan: string;
}

export interface PaymentMethodInterface {
  id: string | number;
}