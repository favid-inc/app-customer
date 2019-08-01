import { NavigationContainer, createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { SettingsContainer } from './SettingsContainer';
import { AccountNavigator } from './Account';
import { CreditCardNavigator } from './Payment';

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
