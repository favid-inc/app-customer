import { START_PROCESSING_PAYMENT, STOP_PROCESSING_PAYMENT } from '../actions/ActionTypes';

const INITIAL_STATE = {
  loading: false,
};

const startProcessingPayment = state => ({
  ...state,
  loading: true,
});

const stopProcessingPayment = state => ({
  ...state,
  loading: false,
});

const paymentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_PROCESSING_PAYMENT:
      return startProcessingPayment(state);
    case STOP_PROCESSING_PAYMENT:
      return stopProcessingPayment(state);
    default:
      return state;
  }
};

export default paymentReducer;
