import { LOAD_ORDER_ENDED, LOAD_ORDER_STARTED, ORDER_ERROR, POST_ORDER, SET_ORDER, STORE_ORDERS } from '../actions/ActionTypes';

const INITIAL_STATE = {
  orders: null,
  order: null,
  loading: false,
  error: null,
};

const storeOrders = (state, action) => {
  return {
    ...state,
    orders: [...action.orders],
  };
};

const postOrder = (state, action) => {
  return {
    ...state,
    order: action.order,
  };
};

const postOrderStarted = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const postOrderEnded = (state) => {
  return {
    ...state,
    loading: false,
  };
};

const orderError = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const setOrder = (state, action) => {
  return {
    ...state,
    order: action.order,
  };
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_ORDERS:
      return storeOrders(state, action);
    case POST_ORDER:
      return postOrder(state, action);
    case LOAD_ORDER_STARTED:
      return postOrderStarted(state);
    case LOAD_ORDER_ENDED:
      return postOrderEnded(state);
    case ORDER_ERROR:
      return orderError(state, action);
    case SET_ORDER:
      return setOrder(state, action);
    default:
      return state;
  }
};

export default orderReducer;
