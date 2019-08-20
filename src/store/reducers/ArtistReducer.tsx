import { REMOVE_ARTIST, STORE_ARTIST } from '../actions/ActionTypes';

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

const removeArtist = (state) => {
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
    default:
      return state;
  }
};

export default authReducer;
