import { SET_PAYMENT_TOKEN } from '../actions/ActionTypes';

const INITIAL_STATE = {
  paymentToken: null,
};

const setPaymentToken = (state, action) => ({
  ...state,
  paymentToken: action.paymentToken,
});

const paymentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PAYMENT_TOKEN:
      return setPaymentToken(state, action);
    default:
      return state;
  }
};

export default paymentReducer;
