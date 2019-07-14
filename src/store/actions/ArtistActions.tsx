import { AsyncStorage } from 'react-native';
import { REMOVEARTIST, STOREARTIST, STOREARTISTS } from './ActionTypes';
import * as config from '@src/core/config';
import { ARTIST, ArtistsByMainCategorySearch, ARTISTS_BY_MAIN_CATEGORY_SEARCH } from '@favid-inc/api';
import { Artist } from '@src/core/model';
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

export const listArtists = () => {
  return async dispatch => {
    const response = await fetch(`https://us-central1-onyx-harmony-239219.cloudfunctions.net/api/artists-by-main-category-search`);
    const data = await response.json();
    const categoryOfArtists = data.aggregations.mainCategory.buckets.map(b => {
      const artists: [Artist] = b.by_top_hit.hits.hits.map(a => {
        const artist: Artist = { ...a._source };
        return artist;
      });

      const category: { key: string; artists: [Artist] } = {
        key: b.key,
        artists,
      };
      return category;
    });

    dispatch({
      type: STOREARTISTS,
      payload: categoryOfArtists,
    });
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
