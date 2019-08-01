import * as config from '@src/core/config';
import { LOAD_ORDER_STARTED, LOAD_ORDER_ENDED, ORDER_ERROR, STORE_ORDERS, SET_ORDER } from './ActionTypes';
import { OrderModel, OrderFlow, OrderFlowPlaceOrderArguments, OrderFlowPlaceOrderResponse } from '@favid-inc/api';

export const postOrder = (options: OrderFlowPlaceOrderArguments, idToken: String) => {
  return async dispatch => {
    dispatch(loadOrderStarted());

    const response = await fetch(`${config.api.baseURL}/${OrderFlow.PLACE}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },

      body: JSON.stringify({ order: options }),
    });

    const { order }: OrderFlowPlaceOrderResponse = await response.json();

    if (!response.ok) {
      const message = response.status === 403 ? 'Sua sessão expirou.' : 'Erro interno do servidor.';
      dispatch(orderError({ status: response.status, message }));
    }

    dispatch(loadOrderEnded());
  };
};

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
    const queryParams = `?orderBy="customerId"&equalTo="${userId}"`;
    const response = await fetch(`${config.firebase.databaseURL}/order.json${queryParams}`);
    if (response.status === 200) {
      const data = await response.json();
      const orders: OrderModel[] = Object.values(data);
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
