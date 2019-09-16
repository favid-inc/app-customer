import { createStackNavigator } from 'react-navigation';

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
      defaultNavigationOptions: { header: null },
    },
  ),
);
