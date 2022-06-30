export interface SubscriptionsInterface {
  id: number | string;
  users_id: number;
  companies_id: number;
  companies_branches_id: number;
  companies_groups_id: number;
  apps_id: number;
  subscription_types_id: number;
  name: string;
  stripe_id: string;
  stripe_plan: string;
  stripe_status: string;
  quantity: number;
  trial_ends_at: string | undefined;
  grace_period_ends: string | undefined;
  next_due_payment: string;
  ends_at: string | undefined;
  payment_frequency_id: number;
  trial_ends_days: string | undefined;
  is_freetrial: number | boolean;
  is_active: number | boolean;
  paid: number | boolean;
  charge_date: string;
  created_at: string;
  updated_at: string;
  is_deleted: number | boolean;
  is_cancelled: number | boolean;
}

export interface PaymentMethodInterface {
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string | number;
}

export interface UpdatePaymentMethodInterface {
  card_number?: string;
  card_exp_month?: number;
  card_exp_year?: number;
  card_cvc?: number;
  card_token?: string;
}

interface PaymentHistoryLinesData {
  description: string;
}

export interface PaymentHistoryInterface {
  id: string;
  object: string;
  amount_paid: number;
  billing_reason: string;
  collection_method: string;
  created: number;
  currency: string;
  paid: boolean;
  lines: {
    data: PaymentHistoryLinesData[];
  };
}