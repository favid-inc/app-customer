import { Artist } from '@favid-inc/api';
import { ListArtistsGroupingByMainCategory } from '@favid-inc/api/lib/app-customer';
import { AsyncStorage } from 'react-native';

import { CategoryOfArtistModel } from '@src/core/model';
import { apiClient } from '@src/core/utils/apiClient';

import { REMOVE_ARTIST, STORE_ARTIST, STORE_ARTISTS } from './ActionTypes';

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

export const listArtists = () => {
  return async (dispatch) => {
    try {
      type Action = ListArtistsGroupingByMainCategory;

      const request: Action['Request'] = {
        url: '/ListArtistsGroupingByMainCategory',
        method: 'GET',
      };

      const { data } = await apiClient.request<Action['Response']>(request);

      dispatch({
        type: STORE_ARTISTS,
        payload: Object.entries(data).map(([key, artists]) => ({ key, artists })),
      });
    } catch (e) {
      const categoryOfArtists: CategoryOfArtistModel[] = [];

      dispatch({
        type: STORE_ARTISTS,
        payload: categoryOfArtists,
      });
    }
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
