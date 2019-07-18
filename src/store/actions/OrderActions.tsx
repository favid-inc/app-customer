import * as config from '@src/core/config';
import { POSTORDERSTARTED, POSTORDERENDED } from './ActionTypes';
import { OrderModel, ORDER } from '@favid-inc/api';
export const postOrder = (order: OrderModel) => {
  return async dispatch => {
    dispatch(postOrderStarted());
    await fetch(`${config.firebase.databaseURL}/order.json`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    dispatch(postOrderEnded());
  };
};

export const postOrderStarted = () => {
  return {
    type: POSTORDERSTARTED,
  };
};

export const postOrderEnded = () => {
  return {
    type: POSTORDERENDED,
  };
};
