import { TopBarNavigationOptions } from '@src/core/navigation/options';
import { createStackNavigator, NavigationContainer } from 'react-navigation';
import { AccountContainer } from './AccountCointainer';

export const AccountNavigator: NavigationContainer = createStackNavigator(
  {
    ['Conta']: AccountContainer,
  },
  {
    navigationOptions: TopBarNavigationOptions,
  },
);
