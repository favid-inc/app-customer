import React from 'react';
import { useScreens } from 'react-native-screens';
import {
  createAppContainer,
  createStackNavigator,
  NavigationAction,
  NavigationContainer,
  NavigationRouteConfigMap,
  NavigationState,
} from 'react-navigation';

import { ArtistDetailsContainer } from '@src/containers/artistDetails';
import { AuthContainer } from '@src/containers/auth';
import { BuyingProcessNavigation } from '@src/containers/buyingProcess';
import { MenuNavigator } from '@src/containers/menu';
import { OrderDetailsContainerNavigationMap, OrdersNavigator } from '@src/containers/orders';
import { SettingsNavigationMap } from '@src/containers/settings';
import { AuthContext } from '@src/core/auth';

import { SocialNavigationOptions } from './options';

const ArtistNavigationMap: NavigationRouteConfigMap = {
  Artista: {
    screen: ArtistDetailsContainer,
    navigationOptions: SocialNavigationOptions,
  },
};

const SignInNavigator: NavigationContainer = createStackNavigator(
  {
    ['Sign In']: AuthContainer,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppNavigator: NavigationContainer = createStackNavigator(
  {
    MenuNavigator,
    BuyingProcessNavigation,
    OrdersNavigator,
    ...ArtistNavigationMap,
    ...OrderDetailsContainerNavigationMap,
    ...SettingsNavigationMap,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const createAppRouter = (container: NavigationContainer): NavigationContainer => {
  useScreens();
  return createAppContainer(container);
};

const NavigationRouter: NavigationContainer = createAppRouter(AppNavigator);
const AuthNavigationRouter: NavigationContainer = createAppRouter(SignInNavigator);

interface ComponentProps {
  onNavigationStateChange: (
    prevNavigationState: NavigationState,
    nextNavigationState: NavigationState,
    action: NavigationAction,
  ) => void;
}

export class Router extends React.Component<ComponentProps> {
  public render() {
    return (
      <AuthContext.Consumer>
        {({ isSignedIn }) =>
          isSignedIn ? (
            <NavigationRouter onNavigationStateChange={this.props.onNavigationStateChange} />
          ) : (
            <AuthNavigationRouter onNavigationStateChange={this.props.onNavigationStateChange} />
          )
        }
      </AuthContext.Consumer>
    );
  }
}
