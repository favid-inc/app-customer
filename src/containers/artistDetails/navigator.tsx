import { TopBarNavigationOptions } from '@src/core/navigation/options';

import { ArtistDetailsContainer } from './ArtistDetailsContainer';
import { ArtistReview } from './artistReview';

import { createStackNavigator } from 'react-navigation';

export const ArtistNavigator = createStackNavigator(
  {
    'Artista': ArtistDetailsContainer,
    'Avaliar Artista': ArtistReview,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: TopBarNavigationOptions,
  },
);
