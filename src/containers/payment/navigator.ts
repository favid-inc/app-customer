import { createStackNavigator } from 'react-navigation';

import { connect } from './context';
import { CheckoutContainer } from './checkout';
import { PaymentMethodContainer } from './paymentMethod';
import { PersonalInfoContainer } from './personal';

export const PaymentNavigator = connect(
  createStackNavigator(
    {
      'Método de pagamento': PaymentMethodContainer,
      'Dados Pessoais': PersonalInfoContainer,
      'Checkout': CheckoutContainer,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: { header: null },
    },
  ),
);
