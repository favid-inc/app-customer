import * as firebase from 'firebase';
import * as AppAuth from 'expo-app-auth';
import { AsyncStorage } from 'react-native';

import * as config from '@src/core/config';
import { storageKeys } from '@src/core/config';
import { Customer as CustomerModel } from '@src/core/model/customer.model';
import { AuthState as AuthStateModel } from '@src/core/model/authState.model';

import { SIGN_IN, SIGN_OUT, SIGN_IN_STARTED, SIGN_IN_ENDED, SIGN_IN_ERROR } from './ActionTypes';

const storageKey = storageKeys.currentUser;

export const auth = () => {
  return async dispatch => {
    dispatch(signInStarted());

    const authResult = await AppAuth.authAsync(config.auth);

    const credential = firebase.auth.GoogleAuthProvider.credential(authResult.idToken, authResult.accessToken);

    const authData = await firebase.auth().signInWithCredential(credential);

    const data = JSON.parse(JSON.stringify(authData)).user;

    const idToken = await firebase.auth().currentUser.getIdToken();

    const customer: CustomerModel = {
      uid: data.uid,
      displayName: data.displayName,
      photoURL: data.photoURL,
      email: data.email,
      lastLoginAt: data.lastLoginAt,
      createdAt: data.createdAt,
      idToken,
    };

    const authState: AuthStateModel = {
      ...customer,
      redirectEventId: data.redirectEventId,
      lastLoginAt: data.lastLoginAt,
      createdAt: data.createdAt,
    };

    await AsyncStorage.setItem(storageKey, JSON.stringify(authState));

    dispatch(signIn(authState));
    dispatch(signInFinished());
  };
};

export const signIn = (authState: AuthStateModel) => {
  return {
    type: SIGN_IN,
    authState,
  };
};

export const signInStarted = () => {
  return {
    type: SIGN_IN_STARTED,
  };
};

export const signInFinished = () => {
  return {
    type: SIGN_IN_ENDED,
  };
};

export const signInError = error => {
  return {
    type: SIGN_IN_ERROR,
    error,
  };
};

export const loadAuthState = () => {
  return async dispatch => {
    const authState = await AsyncStorage.getItem(storageKey);
    dispatch(signIn(JSON.parse(authState)));
  };
};

export const verifyCustomer = (customer: CustomerModel) => {
  return async dispatch => {
    const response = await fetch(`${config.firebase.databaseURL}/customer.json/${customer.uid}`);
    const data: any = await response.json();

    if (Object.keys(data).length) {
      const customerID = Object.keys(data)[0];
      if (data[customerID].uid) {
        return;
      }
      dispatch(registerCustomer(customer));
    } else {
      dispatch(registerCustomer(customer));
    }
  };
};

const registerCustomer = (customer: CustomerModel) => {
  return async () => {
    const response = await fetch(`${config.firebase.databaseURL}/customer.json/${customer.uid}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    console.log(response);
  };
};

export const signOut = () => {
  AsyncStorage.removeItem(storageKey);
  return {
    type: SIGN_OUT,
  };
};
