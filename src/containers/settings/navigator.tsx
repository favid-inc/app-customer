import { createStackNavigator, NavigationContainer, NavigationRouteConfigMap } from 'react-navigation';
import { AccountNavigator } from './Account';
import { CreditCardNavigator } from './Payment';
import { SettingsContainer } from './SettingsContainer';

export const SettingsNavigator: NavigationContainer = createStackNavigator(
  {
    Settings: SettingsContainer,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: { header: null },
  },
);

export const SettingsNavigationMap: NavigationRouteConfigMap = {
  AccountNavigator,
  CreditCardNavigator,
};
