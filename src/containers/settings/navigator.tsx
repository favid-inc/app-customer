import { createStackNavigator, NavigationContainer } from 'react-navigation';
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
