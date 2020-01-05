import { createStackNavigator } from 'react-navigation';

import { TopBarNavigationOptions } from '@src/core/navigation/options';

import { connect } from './context';
import { CheckoutContainer } from './checkout';
import { PaymentMethodContainer } from './paymentMethod';
import { PersonalInfoContainer } from './personal';

export const PaymentNavigator = connect(
  createStackNavigator(
    {
      'Método de pagamento': PaymentMethodContainer,
      'Dados Pessoais': PersonalInfoContainer,
      'Concluir': CheckoutContainer,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: TopBarNavigationOptions,
    },
  ),
);
