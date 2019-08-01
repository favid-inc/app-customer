import * as config from '@src/core/config';
import { LOADORDERSTARTED, LOADORDERENDED, ORDERERROR, STOREORDERS, SETORDER } from './ActionTypes';
import { OrderModel, OrderFlow, OrderStatus } from '@favid-inc/api';

export const postOrder = (order: OrderModel, idToken: String) => {
  return async dispatch => {
    dispatch(loadOrderStarted());
    const response = await fetch(`${config.api.baseURL}/${OrderFlow.PLACE}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },

      body: JSON.stringify(order),
    });
    if (!response.ok) {
      const message = response.status === 403 ? 'Sua sessão expirou.' : 'Erro interno do servidor.';
      dispatch(orderError({ status: response.status, message }));
    }

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
    const queryParams = `?orderBy="customerId"&equalTo="${userId}"`;
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
