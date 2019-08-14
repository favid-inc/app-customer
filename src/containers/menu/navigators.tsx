import {
  NavigationContainer,
  createBottomTabNavigator,
  NavigationRouteConfigMap,
  createStackNavigator,
} from 'react-navigation';
import { MenuContainer } from './menu.container';
import { ArtistsNavigator } from '../artists';
import { OrdersNavigator } from '../orders';
import { OrderInfoContainer } from '../buyingProcess/orderInfo/OrderInfoContainer';
import { SettingsNavigator } from '../settings';
import { connect } from '../buyingProcess/context';
export const OrderInfoNavigator = connect(
  createStackNavigator(
    {
      OrderInfoContainer,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: { header: null },
    },
  ),
);

const menuNavigationMap: NavigationRouteConfigMap = {
  OrderInfo: OrderInfoNavigator,
  // Artists: ArtistsNavigator,
  Orders: OrdersNavigator,
  Settings: SettingsNavigator,
};

export const MenuNavigator: NavigationContainer = createBottomTabNavigator(menuNavigationMap, {
  tabBarComponent: MenuContainer,
});
