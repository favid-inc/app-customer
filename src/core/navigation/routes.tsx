import React from 'react';
import { connect } from 'react-redux';
import { useScreens } from 'react-native-screens';
import {
  NavigationAction,
  createAppContainer,
  createStackNavigator,
  NavigationContainer,
  NavigationRouteConfigMap,
  NavigationState,
} from 'react-navigation';
import { SocialNavigationOptions } from './options';
import SignInContainer from '@src/containers/signin/SignInContainer';
import ArtistDetailsContainer from '@src/containers/artistDetails/ArtistDetailsContainer';
import * as BuyingProcess from '@src/containers/buyingProcess/index';
import { OrdersNavigator, OrderDetailsContainerNavigationMap } from '@src/containers/orders';
import { MenuNavigator } from '../../containers/menu';
import { SettingsNavigationMap } from '../../containers/settings';

const BuyingProcessNavigationMap: NavigationRouteConfigMap = {
  ['Booking']: {
    screen: BuyingProcess.default.BookingContainer,
    navigationOptions: SocialNavigationOptions,
  },
};

const ArtistNavigationMap: NavigationRouteConfigMap = {
  ['Artist Details']: {
    screen: ArtistDetailsContainer,
    navigationOptions: SocialNavigationOptions,
  },
};

const SignInNavigator: NavigationContainer = createStackNavigator(
  {
    ['Sign In']: SignInContainer,
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
    ['Home']: MenuNavigator,
    ...ArtistNavigationMap,
    ...BuyingProcessNavigationMap,
    ...OrderDetailsContainerNavigationMap,
    ...SettingsNavigationMap,
    OrdersNavigator,
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
  auth: any;
  onNavigationStateChange: (
    prevNavigationState: NavigationState,
    nextNavigationState: NavigationState,
    action: NavigationAction,
  ) => void;
}

class Router extends React.Component<ComponentProps> {
  public render() {
    let navigation = <AuthNavigationRouter onNavigationStateChange={this.props.onNavigationStateChange} />;
    if (this.props.auth.authState.uid) {
      navigation = <NavigationRouter onNavigationStateChange={this.props.onNavigationStateChange} />;
    }
    return navigation;
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth });

export default connect(mapStateToProps)(Router);
