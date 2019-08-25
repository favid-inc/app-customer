import { NavigationRouteConfigMap } from 'react-navigation';

import { TopBarNavigationOptions } from '@src/core/navigation/options';
import { ArtistDetailsContainer } from './ArtistDetailsContainer';
import { ArtistReview } from './artistReview';

export const ArtistNavigationMap: NavigationRouteConfigMap = {
  'Artista': {
    screen: ArtistDetailsContainer,
    navigationOptions: TopBarNavigationOptions,
  },
  'Avaliar Artista': {
    screen: ArtistReview,
    navigationOptions: TopBarNavigationOptions,
  },
};
