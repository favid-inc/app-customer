import { TopBarNavigationOptions } from '@src/core/navigation/options';

import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';

import { connect } from '@src/containers/buyingProcess/context';
import { PayerContainer } from '@src/containers/buyingProcess/payer/PayerContainer';
import { PaymentContainer } from '@src/containers/buyingProcess/paymentMethod/PaymentMethodContainer';

import { OrderDetailsContainer } from './orderDetails';
import { OrdersContainer } from './orders';

export const OrderDetailsContainerNavigationMap: NavigationRouteConfigMap = {
  ['Detalhes do Pedido']: {
    screen: OrderDetailsContainer,
    navigationOptions: { ...TopBarNavigationOptions },
  },
};
export const OrdersNavigator = connect(
  createStackNavigator(
    {
      'Orders': OrdersContainer,
      'Pagamento': {
        screen: PaymentContainer,
        navigationOptions: { ...TopBarNavigationOptions },
      },
      'Informações do Pedido': {
        screen: PayerContainer,
        navigationOptions: { ...TopBarNavigationOptions },
      },
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: { header: null },
    },
  ),
);
