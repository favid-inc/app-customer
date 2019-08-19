import { Order } from '@favid-inc/api';
import { ListArtistsGroupingByMainCategory } from '@favid-inc/api/lib/app-customer';

import { apiClient } from '@src/core/utils/apiClient';

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

export const getOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(loadOrderStarted());

      const orders: Order[] = [];

      // const request: ListArtistsGroupingByMainCategory['Request'] = {
      //   url: '/ListArtistsGroupingByMainCategory',
      //   method: 'POST',
      // };

      // apiClient.request(request);

      dispatch(storeOrders(orders));
      dispatch(loadOrderEnded());
    } catch (error) {
      dispatch(orderError({ message: 'Erro ao listar pedidos.' }));
    }
  };
};

export const setOrder = (order: Order) => ({
  type: SET_ORDER,
  order,
});
