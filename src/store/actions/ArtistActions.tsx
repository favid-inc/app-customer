import { AsyncStorage } from 'react-native';
import { REMOVE_ARTIST, STORE_ARTIST, STORE_ARTISTS } from './ActionTypes';
import * as config from '@src/core/config';
import { ArtistSearchByMainCategoryResult, ArtistSearch } from '@favid-inc/api';
import { Artist, CategoryOfArtistModel } from '@src/core/model';

export const setArtist = (artist: Artist) => {
  AsyncStorage.setItem('artist', JSON.stringify(artist));
  return async dispatch => dispatch(storeArtist(artist));
};

export const getArtist = () => {
  return async dispatch => {
    const artistString: string = await AsyncStorage.getItem('artist');
    const artist: Artist = JSON.parse(artistString);
    dispatch(storeArtist(artist));
  };
};

const processArtistList = (result: ArtistSearchByMainCategoryResult): CategoryOfArtistModel[] => {
  const categoryOfArtists: CategoryOfArtistModel[] = result.aggregations.mainCategory.buckets.map(bucket => {
    const artists: Artist[] = bucket.by_top_hit.hits.hits.map(a => a._source);

    const category: CategoryOfArtistModel = {
      key: bucket.key,
      artists,
    };

    return category;
  });
  return categoryOfArtists;
};

export const listArtists = () => {
  return async dispatch => {
    const storeArtists = await AsyncStorage.getItem('categoryOfArtists');
    if (storeArtists) {
      dispatch({
        type: STORE_ARTISTS,
        payload: JSON.parse(storeArtists),
      });
    }

    try {
      const response = await fetch(`${config.api.baseURL}/${ArtistSearch.BY_MAIN_CATEGORY}`);
      if (response.ok) {
        const data: ArtistSearchByMainCategoryResult = await response.json();

        const categoryOfArtists: CategoryOfArtistModel[] = processArtistList(data);
        AsyncStorage.setItem('categoryOfArtists', JSON.stringify(categoryOfArtists));

        dispatch({
          type: STORE_ARTISTS,
          payload: categoryOfArtists,
        });
      }
    } catch (e) {
      const categoryOfArtists: CategoryOfArtistModel[] = [];

      dispatch({
        type: STORE_ARTISTS,
        payload: categoryOfArtists,
      });

      console.error(e);
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
