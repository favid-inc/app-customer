import { TopBarNavigationOptions } from '@src/core/navigation/options';

import { createStackNavigator } from 'react-navigation';

import { connect } from '@src/containers/payment/context';
import { PaymentNavigator } from '@src/containers/payment';

import { OrdersContainer } from './orders';

export const OrdersNavigator = connect(
  createStackNavigator(
    {
      Pedidos: OrdersContainer,
      Pagamento: PaymentNavigator,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: TopBarNavigationOptions,
    },
  ),
);
