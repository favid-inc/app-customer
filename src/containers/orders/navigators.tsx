import { TopBarNavigationOptions } from '@src/core/navigation/options';

import { createStackNavigator } from 'react-navigation';

import { OrdersContainer } from './orders';

export const OrdersNavigator = createStackNavigator(
  {
    Pedidos: OrdersContainer,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: TopBarNavigationOptions,
  },
);
