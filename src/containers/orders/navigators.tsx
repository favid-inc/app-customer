import { createStackNavigator } from 'react-navigation';
import { PaymentNavigator } from '@src/containers/payment';
import { connect } from '@src/containers/payment/context';

import { OrdersContainer } from './list';
import { CancelContainer } from './cancel';

export const OrdersNavigator = connect(
  createStackNavigator(
    {
      Pedidos: OrdersContainer,
      Pagamento: PaymentNavigator,
      Cancelar: CancelContainer,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: { header: null },
    },
  ),
);
