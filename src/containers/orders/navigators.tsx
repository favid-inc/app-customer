import { PaymentContainer } from '@src/containers/buyingProcess/payment/PaymentContainer';
import { TopBarNavigationOptions } from '@src/core/navigation/options';
import { createStackNavigator, NavigationContainer, NavigationRouteConfigMap } from 'react-navigation';
import { connect } from '../buyingProcess/context';
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
      Orders: OrdersContainer,
      Pagamento: {
        screen: PaymentContainer,
        navigationOptions: { ...TopBarNavigationOptions },
      },
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: { header: null },
    },
  ),
);
