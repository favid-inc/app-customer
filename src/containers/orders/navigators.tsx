import { createStackNavigator } from 'react-navigation';
import { PaymentNavigator } from '@src/containers/payment';
import { connect } from '@src/containers/payment/context';

import { OrdersContainer } from './list';
import { CancelOrderContainer } from './cancel';
import { TopBarNavigationOptions } from '@src/core/navigation/options';

export const OrdersNavigator = connect(
  createStackNavigator(
    {
      'Pedidos': OrdersContainer,
      'Pagamento': PaymentNavigator,
      'Cancelar Pedido': CancelOrderContainer,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: TopBarNavigationOptions,
    },
  ),
);
