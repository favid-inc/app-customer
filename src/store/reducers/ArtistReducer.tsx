import { STORE_ARTIST, REMOVE_ARTIST, STORE_ARTISTS } from '../actions/ActionTypes';

const INITIAL_STATE = {
  artist: null,
  categoryOfArtists: null,
};

const storeArtist = (state, action) => {
  return {
    ...state,
    artist: {
      ...state.artist,
      ...action.payload,
    },
  };
};

const storeArtists = (state, action) => {
  return {
    ...state,
    categoryOfArtists: [...action.payload],
  };
};

const removeArtist = state => {
  return {
    ...state,
    artist: null,
  };
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_ARTIST:
      return storeArtist(state, action);
    case REMOVE_ARTIST:
      return removeArtist(state);
    case STORE_ARTISTS:
      return storeArtists(state, action);
    default:
      return state;
  }
};

export default authReducer;
