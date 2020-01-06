import { createStackNavigator } from 'react-navigation';
import { PaymentNavigator } from '@src/containers/payment';
import { connect } from '@src/containers/payment/context';
import { OrdersContainer } from './list';

export const OrdersNavigator = connect(
  createStackNavigator(
    {
      Pedidos: OrdersContainer,
      Pagamento: PaymentNavigator,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: { header: null },
    },
  ),
);
