import { Artist } from '@favid-inc/api';
import { AsyncStorage } from 'react-native';

import { REMOVE_ARTIST, STORE_ARTIST } from './ActionTypes';

export const setArtist = (artist: Artist) => {
  return async (dispatch) => dispatch(storeArtist(artist));
};

export const getArtist = () => {
  return async (dispatch) => {
    const artistString: string = await AsyncStorage.getItem('artist');
    const artist: Artist = JSON.parse(artistString);

    dispatch(storeArtist(artist));
  };
};

export const storeArtist = (artist: Artist) => {
  return {
    type: STORE_ARTIST,
    payload: artist,
  };
};

export const removeArtist = () => {
  AsyncStorage.removeItem('artist');
  return {
    type: REMOVE_ARTIST,
  };
};
