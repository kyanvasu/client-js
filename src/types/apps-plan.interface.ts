export interface AppsPlanInterface {
  payment_style: 'monthly' | 'yearly';
  stipe_plan: string;
  stripe_id: string | number;
}

export interface PaymentMethodInterface {
  id: string | number;
}