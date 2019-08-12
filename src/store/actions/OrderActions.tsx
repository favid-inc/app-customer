import * as config from '@src/core/config';
import { LOAD_ORDER_STARTED, LOAD_ORDER_ENDED, ORDER_ERROR, STORE_ORDERS, SET_ORDER } from './ActionTypes';
import { OrderModel } from '@favid-inc/api';

export const loadOrderStarted = () => ({
  type: LOAD_ORDER_STARTED,
});

export const loadOrderEnded = () => ({
  type: LOAD_ORDER_ENDED,
});

export const orderError = error => ({
  type: ORDER_ERROR,
  error,
});

export const storeOrders = (orders: OrderModel[]) => ({ type: STORE_ORDERS, orders });

export const getOrders = (userId: string) => {
  return async dispatch => {
    dispatch(loadOrderStarted());
    const queryParams = ''; // `?orderBy="customerId"&equalTo="${userId}"`; TODO: fix

    const response = await fetch(`${config.firebase.databaseURL}/order.json${queryParams}`);
    if (response.ok) {
      const data: { [key: string]: OrderModel } = await response.json();

      const orders: OrderModel[] = Object.values(data).filter(o => o.customerId === userId);

      dispatch(storeOrders(orders));
    } else {
      dispatch(orderError({ status: response.status, message: 'Erro ao listar pedidos.' }));
    }
    dispatch(loadOrderEnded());
  };
};

export const setOrder = (order: OrderModel) => ({
  type: SET_ORDER,
  order,
});
