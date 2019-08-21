import { createStackNavigator, NavigationContainer } from 'react-navigation';
import { ArtistsContainer } from './ArtistsContainer';

export const ArtistsNavigator: NavigationContainer = createStackNavigator(
  {
    Artists: ArtistsContainer,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: { header: null },
  },
);
