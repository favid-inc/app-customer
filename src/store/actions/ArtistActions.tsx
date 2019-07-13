import { AsyncStorage } from 'react-native';
import { REMOVEARTIST, STOREARTIST } from './ActionTypes';
import { Artist } from '@src/core/model/artist.model';

export const setArtist = (artist: Artist) => {
  AsyncStorage.setItem('artist', JSON.stringify(artist));
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
    type: STOREARTIST,
    payload: artist,
  };
};

export const removeArtist = () => {
  AsyncStorage.removeItem('artist');
  return {
    type: REMOVEARTIST,
  };
};
