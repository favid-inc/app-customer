import * as AppAuth from 'expo-app-auth';
import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

import * as config from '@src/core/config';
import { storageKeys } from '@src/core/config';
import { AuthState as AuthStateModel } from '@src/core/model/authState.model';
import { Customer as CustomerModel } from '@src/core/model/customer.model';

import { SIGN_IN, SIGN_IN_ENDED, SIGN_IN_ERROR, SIGN_IN_STARTED, SIGN_OUT, UPDATE_IS_LOGGED_IN } from './ActionTypes';

const storageKey = storageKeys.currentUser;

export const auth = () => {
  return async (dispatch) => {
    dispatch(signInStarted());

    const authState = await AppAuth.authAsync(config.auth);

    const credential = firebase.auth.GoogleAuthProvider.credential(authState.idToken, authState.accessToken);
    await firebase.auth().signInWithCredential(credential);
    const idToken = await firebase.auth().currentUser.getIdToken();
    authState.idToken = idToken;
    const { uid, displayName, photoURL, email } = await firebase.auth().currentUser;
    const customer: CustomerModel = { uid, displayName, photoURL, email };
    // authState.accessTokenExpirationDate = new Date(new Date().setSeconds(new Date().getSeconds() + 30)).toString();
    await AsyncStorage.setItem(storageKey, JSON.stringify({ authState, customer }));
    dispatch(signIn(authState, customer));
    dispatch(signInFinished());
  };
};

export const reAuth = ({ refreshToken }: AuthStateModel) => {
  return async (dispatch) => {
    const authState = await AppAuth.refreshAsync(config.auth, refreshToken);
    const credential = firebase.auth.GoogleAuthProvider.credential(authState.idToken, authState.accessToken);
    await firebase.auth().signInWithCredential(credential);
    const idToken = await firebase.auth().currentUser.getIdToken();
    authState.idToken = idToken;

    const { uid, displayName, photoURL, email } = await firebase.auth().currentUser;
    const customer: CustomerModel = { uid, displayName, photoURL, email };

    await AsyncStorage.setItem(storageKey, JSON.stringify({ authState, customer }));
    dispatch(signIn(authState, customer));
  };
};

export const verifySession = (authState: AuthStateModel) => {
  return async (dispatch) => {
    const expirationTime = new Date(authState.accessTokenExpirationDate).getTime();
    const currentTime = new Date().getTime();

    console.log('[AuthActions.tsx] veridySession(): expirationTime: ', new Date(expirationTime).toString());
    console.log('[AuthActions.tsx] veridySession(): currentTime: ', new Date(currentTime).toString());

    if (expirationTime < currentTime) {
      dispatch(reAuth(authState));
      console.log('[AuthActions.tsx] verifySession() session expirated');
    } else {
      console.log('[AuthActions.tsx] veridySession() user authenticated');
    }
  };
};

export const updateIsLoggedIn = (isLoggedIn: boolean) => {
  return {
    type: UPDATE_IS_LOGGED_IN,
    isLoggedIn,
  };
};

export const signIn = (authState: AuthStateModel, customer: CustomerModel) => {
  return {
    type: SIGN_IN,
    authState,
    customer,
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

export const signInError = (error) => {
  return {
    type: SIGN_IN_ERROR,
    error,
  };
};

export const loadAuthState = () => {
  return async (dispatch) => {
    const data = await AsyncStorage.getItem(storageKey);
    if (!data) {
      return;
    }
    const { authState, customer } = JSON.parse(data);
    dispatch(signIn(authState, customer));
  };
};

export const removeUser = () => {
  return {
    type: SIGN_OUT,
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    await AsyncStorage.removeItem(storageKey);
    dispatch(removeUser());
  };
};
