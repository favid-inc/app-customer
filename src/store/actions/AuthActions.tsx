import { AsyncStorage } from 'react-native';
import { SIGNIN, SIGNOUT } from './ActionTypes';

import {storageKeys} from '@src/core/config';

const storageKey = storageKeys.currentUser;

export const signIn = (authState) => {
  AsyncStorage.setItem(storageKey, JSON.stringify(authState));
  return {
    type: SIGNIN,
    payload: authState,
  };
};

export const loadAuthState = () => {
  return async (dispatch) => {
    const authState = await AsyncStorage.getItem(storageKey);
    dispatch(signIn(JSON.parse(authState)));
  };
};

export const verifyCustomer = (customer: CustomerModel) => {
  return async dispatch => {
    console.log('[AuthActions.tsx] verifyCustomer() => started');

    const queryParams = `?orderBy="uid"&equalTo="${customer.uid}"`;
    const response = await fetch(`${config.firebase.databaseURL}/customer.json${queryParams}`);
    const data: any = await response.json();

    if (Object.keys(data).length) {
      const customerID = Object.keys(data)[0];
      if (data[customerID].uid) {
        console.log('[AuthActions.tsx] verifyCustomer() => finished: user already registred');
        return;
      }
      console.log('[AuthActions.tsx] verifyCustomer() => finished: register user');
      dispatch(registerCustomer(customer));
    } else {
      console.log('[AuthActions.tsx] verifyCustomer() => finished: register user');
      dispatch(registerCustomer(customer));
    }
  };
};

const registerCustomer = (customer: CustomerModel) => {
  return async () => {
    console.log('[AuthActions.tsx] registerCustomer() => started');
    await fetch(`${config.firebase.databaseURL}/customer.json`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    console.log('[AuthActions.tsx] registerCustomer() => finished');
  };
};

export const signOut = () => {
  AsyncStorage.removeItem(storageKey);
  return {
    type: SIGNOUT,
  };
};
