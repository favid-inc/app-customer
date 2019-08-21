import { createStackNavigator, NavigationContainer, NavigationRouteConfigMap } from 'react-navigation';
import { AccountNavigator } from './Account';
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
};
