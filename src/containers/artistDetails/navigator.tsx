import { ArtistReview } from './artistReview';
import { ArtistDetailsContainer } from './ArtistDetailsContainer';
import { TopBarNavigationOptions } from '@src/core/navigation/options';
import { NavigationRouteConfigMap } from 'react-navigation';

export const ArtistNavigationMap: NavigationRouteConfigMap = {
  "Artista": {
    screen: ArtistDetailsContainer,
    navigationOptions: TopBarNavigationOptions,
  },
  'Avaliar Artista': {
    screen: ArtistReview,
    navigationOptions: TopBarNavigationOptions,
  },
};
