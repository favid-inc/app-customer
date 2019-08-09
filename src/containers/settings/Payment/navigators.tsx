import { NavigationContainer, createStackNavigator } from 'react-navigation';
import { CreditCardContainer } from './CreditCardContainer';
import { TopBarNavigationOptions } from '@src/core/navigation/options';

export const CreditCardNavigator = {
  Pagamento: {
    screen: CreditCardContainer,
    navigationOptions: TopBarNavigationOptions,
  },
};
