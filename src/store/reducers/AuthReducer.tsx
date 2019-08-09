import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_STARTED,
  SIGN_IN_ENDED,
  SIGN_IN_ERROR,
  UPDATE_IS_LOGGED_IN,
} from '../actions/ActionTypes';

const INITIAL_STATE = {
  authState: {
    accessToken: null,
    accessTokenExpirationDate: null,
    additionalParameters: null,
    idToken: null,
    refreshToken: null,
    tokenType: null,
  },
  customer: {
    uid: null,
    displayName: null,
    photoURL: null,
    email: null,
  },
  isloggedIn: false,
  error: null,
  loading: false,
};

const signIn = (state, action) => {
  return {
    ...state,
    authState: {
      ...action.authState,
    },
    customer: {
      ...action.customer,
    },
    isloggedIn: true,
  };
};

const signOut = state => {
  return {
    ...state,
    authState: {
      accessToken: null,
      accessTokenExpirationDate: null,
      additionalParameters: null,
      idToken: null,
      refreshToken: null,
      tokenType: null,
    },
    customer: {
      uid: null,
      displayName: null,
      photoURL: null,
      email: null,
    },
    isloggedIn: false,
  };
};

const signInStarted = state => {
  return {
    ...state,
    loading: true,
  };
};

const signInEnded = state => {
  return {
    ...state,
    loading: false,
  };
};

const signInError = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const updateIsLoggedIn = (state, action) => {
  return {
    ...state,
    isloggedIn: action.isloggedIn,
  };
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return signIn(state, action);
    case SIGN_OUT:
      return signOut(state);
    case SIGN_IN_STARTED:
      return signInStarted(state);
    case SIGN_IN_ENDED:
      return signInEnded(state);
    case SIGN_IN_ERROR:
      return signInError(state, action);
    case UPDATE_IS_LOGGED_IN:
      return updateIsLoggedIn(state, action);
    default:
      return state;
  }
};

export default authReducer;
