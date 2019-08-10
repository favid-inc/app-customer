import { SET_PAYMENT_TOKEN } from './ActionTypes';
export const setPaymentToken = (paymentToken: string) => ({
  type: SET_PAYMENT_TOKEN,
  paymentToken,
});
