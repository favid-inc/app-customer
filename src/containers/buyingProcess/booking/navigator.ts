import { NavigationContainer, createStackNavigator } from 'react-navigation';
import { BookingContainer } from './BookingContainer';
import { TopBarNavigationOptions } from '@src/core/navigation/options';

export const BookingNavigation = {
  Pedido: {
    screen: BookingContainer,
    navigationOptions: TopBarNavigationOptions,
  },
};
