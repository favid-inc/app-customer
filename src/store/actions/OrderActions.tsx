import { Order } from '@favid-inc/api';
import { LOAD_ORDER_ENDED, LOAD_ORDER_STARTED, ORDER_ERROR, SET_ORDER, STORE_ORDERS } from './ActionTypes';

export const loadOrderStarted = () => ({
  type: LOAD_ORDER_STARTED,
});

export const loadOrderEnded = () => ({
  type: LOAD_ORDER_ENDED,
});

export const orderError = (error) => ({
  type: ORDER_ERROR,
  error,
});

export const storeOrders = (orders: Order[]) => ({ type: STORE_ORDERS, orders });

export const getOrders = (userId: string) => {
  return async (dispatch) => {
    try {
      dispatch(loadOrderStarted());
      // const queryParams = ''; // `?orderBy="customerId"&equalTo="${userId}"`; TODO: fix

      // const response = await fetch(`${config.firebase.databaseURL}/order.json${queryParams}`);
      // if (!response.ok) {
      //   console.log(response);
      //   throw new Error(response.statusText);
      // }
      // const data: { [key: string]: Order } = await response.json();

      const orders: Order[] = [];

      dispatch(storeOrders(orders));
      dispatch(loadOrderEnded());
    } catch (error) {
      console.error(error);
      dispatch(orderError({ message: 'Erro ao listar pedidos.' }));
    }
  };
};

export const setOrder = (order: Order) => ({
  type: SET_ORDER,
  order,
});
