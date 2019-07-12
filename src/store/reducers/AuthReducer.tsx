import { SIGNIN, SIGNOUT } from '../actions/ActionTypes';

const INITIAL_STATE = {
	uid: null,
	displayName: null,
	photoURL: null,
	email: null,
	refreshToken: null,
	accessToken: null,
	expirationTime: null,
	redirectEventId: null,
	lastLoginAt: null,
	createdAt: null,
};

const signIn = (state, action) => {
	return {
		...state,
		...action.payload,
	};
};

const signOut = () => {
	return {
		uid: null,
		displayName: null,
		photoURL: null,
		email: null,
		refreshToken: null,
		accessToken: null,
		expirationTime: null,
		redirectEventId: null,
		lastLoginAt: null,
		createdAt: null,
	};
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGNIN:
			return signIn(state, action);
		case SIGNOUT:
			return signOut();
		default:
			return state;
	}
};

export default authReducer;
