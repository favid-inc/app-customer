import { createStackNavigator } from 'react-navigation';
import { TopBarNavigationOptions } from '@src/core/navigation/options';

import { connect } from './context';
import { PersonalInfoContainer } from './personal';
import { PaymentMethodContainer } from './paymentMethod';

export const PaymentNavigator = connect(
  createStackNavigator(
    {
      'Método de pagamento': PaymentMethodContainer,
      'Dados Pessoais': PersonalInfoContainer,
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: TopBarNavigationOptions,
    },
  ),
);
