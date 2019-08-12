import { NavigationContainer, createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { AccountContainer } from './AccountCointainer';
import { TopBarNavigationOptions } from '@src/core/navigation/options';

export const AccountNavigator: NavigationContainer = createStackNavigator(
  {
    ['Conta']: AccountContainer,
  },
  {
    navigationOptions: TopBarNavigationOptions,
  },
);
