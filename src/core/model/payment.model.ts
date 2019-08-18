import {Order} from '@favid-inc/api';

export interface CreditCard {
  number?: string;
  verification_value?: string;
  first_name?: string;
  last_name?: string;
  month?: string;
  year?: string;
}

export interface Payment {
  account_id: string;
  method: string;
  test: boolean;
  creditCard: CreditCard;
}

export interface Address {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  complement?: string;
}

export interface Payer {
  cpf_cnpj: string;
  name: string;
  phone_prefix: string;
  phone: string;
  email: string;
  address: Address;
}

export interface Item {
  description: string;
  quantity: number;
  price_cents: number;
}

export interface PaymentToken {
  account_id?: string;
  method?: string;
  test?: string;
  data?: CreditCard;
}

export interface DirectCharge {
  method?: string;
  token?: string;
  customer_payment_method_id?: string;
  restrict_payment_method?: string;
  customer_id?: string;
  invoice_id?: string;
  email?: string;
  months?: string;
  discount_cents?: string;
  bank_slip_extra_days?: number;
  keep_dunning?: boolean;
  items?: Item[];
  payer?: Payer;
  order_id?: string;
}
export interface Charge {
  order: Order;
  paymentToken?: PaymentToken;
  directCharge?: DirectCharge;
}
export interface ChargeResponse {
  message?: string;
  errors?: object;
  success?: boolean;
  url?: string;
  pdf?: string;
  identification?: string;
  invoice_id?: string;
  LR?: string;
}
