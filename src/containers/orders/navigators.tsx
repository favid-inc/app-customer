import { TopBarNavigationOptions } from '@src/core/navigation/options';
import { createStackNavigator, NavigationContainer, NavigationRouteConfigMap } from 'react-navigation';
import { OrderDetailsContainer } from './orderDetails';
import { OrdersContainer } from './orders';

export const OrderDetailsContainerNavigationMap: NavigationRouteConfigMap = {
  ['Detalhes do Pedido']: {
    screen: OrderDetailsContainer,
    navigationOptions: { ...TopBarNavigationOptions },
  },
};

export const OrdersNavigator: NavigationContainer = createStackNavigator(
  {
    Orders: OrdersContainer,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: { header: null },
  },
);
