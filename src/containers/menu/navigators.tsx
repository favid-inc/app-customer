import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationContainer,
  NavigationRouteConfigMap,
} from 'react-navigation';

import { ArtistsNavigator } from '../artists';
import { BookingContainer } from '../buyingProcess/booking/BookingContainer';
import { connect } from '../buyingProcess/context';
import { OrdersNavigator } from '../orders';
import { SettingsNavigator } from '../settings';

import { MenuContainer } from './MenuContainer';

export const BuyingProcessStack = connect(
  createStackNavigator(
    {
      BookingScreen: BookingContainer,
    },
    {
      headerMode: 'screen',
    },
  ),
);

const menuNavigationMap: NavigationRouteConfigMap = {
  Artists: ArtistsNavigator,
  // Booking: BuyingProcessStack,
  Orders: OrdersNavigator,
  Settings: SettingsNavigator,
};

export const MenuNavigator: NavigationContainer = createBottomTabNavigator(menuNavigationMap, {
  tabBarComponent: MenuContainer,
});
