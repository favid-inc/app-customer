import React from 'react';
import { connect } from 'react-redux';

import { useScreens } from 'react-native-screens';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, NavigationContainer, NavigationRouteConfigMap, NavigationState } from 'react-navigation';
import { MenuContainer } from '@src/containers/menu';
import AccountContainer from '@src/containers/menu/account/AccountCointainer';
import SignInContainer from '@src/containers/signin/SignInContainer';
import ArtistDetailsContainer from '@src/containers/artistDetails/ArtistDetailsContainer';
import ArtistsContainer from '@src/containers/menu/artists/artists.container';
import { SocialNavigationOptions } from './options';
import { NavigationAction } from 'react-navigation';

const AccountNavigator: NavigationContainer = createStackNavigator(
  {
    ['Account']: AccountContainer,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

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

const ArtistsNavigator: NavigationContainer = createStackNavigator(
  {
    ['Artists']: ArtistsContainer,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const MenuNavigator: NavigationContainer = createBottomTabNavigator(
  {
    ['Artists']: ArtistsNavigator,
    ['Account']: AccountNavigator,
  },
  {
    tabBarComponent: MenuContainer,
  },
);

const AppNavigator: NavigationContainer = createStackNavigator(
  {
    ['Home']: MenuNavigator,
    ...ArtistNavigationMap,
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
  isAuth: boolean;
  // tslint:disable-next-line:max-line-length
  onNavigationStateChange: (prevNavigationState: NavigationState, nextNavigationState: NavigationState, action: NavigationAction) => void;
}

class Router extends React.Component<ComponentProps> {
  public render() {
    let navigation = <AuthNavigationRouter onNavigationStateChange={this.props.onNavigationStateChange} />;
    if (this.props.isAuth) {
      navigation = <NavigationRouter onNavigationStateChange={this.props.onNavigationStateChange} />;
    }
    return navigation;
  }
}

const mapStateToProps = ({ auth }) => ({ isAuth: auth.uid !== null });

export default connect(mapStateToProps)(Router);
