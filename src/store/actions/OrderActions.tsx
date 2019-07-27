import * as config from '@src/core/config';
import { LOADORDERSTARTED, LOADORDERENDED, ORDERERROR, STOREORDERS, SETORDER } from './ActionTypes';
import { OrderModel } from '@favid-inc/api';

export const postOrder = (order: OrderModel) => {
  return async dispatch => {
    dispatch(loadOrderStarted());

    await fetch(`${config.firebase.databaseURL}/order.json`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    dispatch(loadOrderEnded());
  };
};

export const loadOrderStarted = () => ({
  type: LOADORDERSTARTED,
});

export const loadOrderEnded = () => ({
  type: LOADORDERENDED,
});

export const orderError = error => ({
  type: ORDERERROR,
  error,
});

export const storeOrders = (orders: OrderModel[]) => ({ type: STOREORDERS, orders });

export const getOrders = (userId: string) => {
  return async dispatch => {
    dispatch(loadOrderStarted());
    const queryParams = `?orderBy="artistId"&equalTo="${userId}"`;
    const response = await fetch(`${config.firebase.databaseURL}/order.json${queryParams}`);

    if (response.status === 200) {
      const data = await response.json();
      const orders: OrderModel[] = Object.keys(data).map(id => ({ id, ...data[id] }));
      dispatch(storeOrders(orders));
    } else {
      dispatch(orderError({ status: response.status, message: 'Erro ao listar pedidos.' }));
    }
    dispatch(loadOrderEnded());
  };
};

export const setOrder = (order: OrderModel) => ({
  type: SETORDER,
  order,
});
