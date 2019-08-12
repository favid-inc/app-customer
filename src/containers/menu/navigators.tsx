import {
  NavigationContainer,
  createBottomTabNavigator,
  NavigationRouteConfigMap,
  createStackNavigator,
} from 'react-navigation';
import { MenuContainer } from './menu.container';
import { ArtistsNavigator } from '../artists';
import { OrdersNavigator } from '../orders';
import { SettingsNavigator } from '../settings';

const menuNavigationMap: NavigationRouteConfigMap = {
  Artists: ArtistsNavigator,
  Orders: OrdersNavigator,
  Settings: SettingsNavigator,
};

export const MenuNavigator: NavigationContainer = createBottomTabNavigator(menuNavigationMap, {
  tabBarComponent: MenuContainer,
});
