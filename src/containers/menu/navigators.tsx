import { createBottomTabNavigator, NavigationContainer, NavigationRouteConfigMap } from 'react-navigation';
import { ArtistsNavigator } from '../artists';
import { OrdersNavigator } from '../orders';
import { SettingsNavigator } from '../settings';
import { MenuContainer } from './menu.container';

const menuNavigationMap: NavigationRouteConfigMap = {
  Artists: ArtistsNavigator,
  Orders: OrdersNavigator,
  Settings: SettingsNavigator,
};

export const MenuNavigator: NavigationContainer = createBottomTabNavigator(menuNavigationMap, {
  tabBarComponent: MenuContainer,
});
