import { START_PROCESSING_PAYMENT, STOP_PROCESSING_PAYMENT } from './ActionTypes';

export const onSendPayment = payment => {
  return async dispatch => {
    dispatch(onStartProcessingPayment());
    const token = '';
    // get token payment
    Iugu.setAccountID('77F674C400DF469B80B18B0D00DB9C1D');
    Iugu.createPaymentToken(this, response => {
      if (response.errors) {
        console.log('Erro salvando cartão');
      } else {
        console.log('Token criado:' + token);
      }
    });

    dispatch(onStopProcessingPayment());
  };
};

export const onStartProcessingPayment = () => ({
  type: START_PROCESSING_PAYMENT,
});

export const onStopProcessingPayment = () => ({
  type: STOP_PROCESSING_PAYMENT,
});
