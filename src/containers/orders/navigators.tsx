import { TopBarNavigationOptions } from '@src/core/navigation/options';

import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';

import { connect } from '@src/containers/payment/context';
import { PaymentNavigator } from '@src/containers/payment';

import { OrderDetailsContainer } from './orderDetails';
import { OrdersContainer } from './orders';

export const OrdersNavigator = connect(
  createStackNavigator(
    {
      'Pedidos': OrdersContainer,
      'Detalhes do Pedido': OrderDetailsContainer,
      'Pagamento': PaymentNavigator,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: TopBarNavigationOptions,
    },
  ),
);
