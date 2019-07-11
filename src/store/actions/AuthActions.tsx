import { AsyncStorage } from 'react-native';
import { SIGNIN, SIGNOUT } from './ActionTypes';
import { storageKey } from '../../firebaseConfig';

export const signIn = (authState) => {
	AsyncStorage.setItem(storageKey, JSON.stringify(authState));
	return {
		type: SIGNIN,
		payload: authState,
	};
};

export const loadAuthState = () => {
	return async dispatch => {
    const authState = await AsyncStorage.getItem(storageKey)
    dispatch(signIn(JSON.parse(authState)));
	};
};

export const signOut = () => {
	AsyncStorage.removeItem(storageKey);
	return {
		type: SIGNOUT,
	};
};
