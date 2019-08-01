import { NavigationContainer, createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { OrdersContainer } from './Orders';
import { OrderDetailsContainer } from './OrderDetails';
import { TopBarNavigationOptions } from '@src/core/navigation/options';

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
