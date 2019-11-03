import { createStackNavigator, NavigationContainer } from 'react-navigation';
import { PoliciesContainer } from '@src/containers/policies';
import { TopBarNavigationOptions } from '@src/core/navigation/options';
import { SettingsContainer } from './SettingsContainer';

export const SettingsNavigator: NavigationContainer = createStackNavigator(
  {
    Settings: SettingsContainer,
    ['Políticas']: {
      screen: PoliciesContainer,
      navigationOptions: TopBarNavigationOptions,
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: { header: null },
  },
);
