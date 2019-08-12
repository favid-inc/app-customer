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
import { OrdersNavigator, OrderDetailsContainerNavigationMap } from '@src/containers/orders';
import { MenuNavigator } from '../../containers/menu';
import { SettingsNavigationMap } from '../../containers/settings';
import { BuyingProcessNavigation } from '../../containers/buyingProcess';
import * as actions from '../../store/actions';

import { Customer as CustomerModel } from '../../core/model/customer.model';
import { AuthState as AuthStateModel } from '../../core/model/authState.model';

const ArtistNavigationMap: NavigationRouteConfigMap = {
  Artista: {
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
  isLoggedIn: boolean;
  customer: CustomerModel;
  authState: AuthStateModel;
  onLoadAuthState: () => void;
  onverifySession: (authState: AuthStateModel) => void;
  onNavigationStateChange: (
    prevNavigationState: NavigationState,
    nextNavigationState: NavigationState,
    action: NavigationAction,
  ) => void;
}

class Router extends React.Component<ComponentProps> {
  componentWillMount() {
    this.props.onLoadAuthState();
  }

  componentDidUpdate() {
    if (this.props.authState.refreshToken) {
      this.props.onverifySession(this.props.authState);
    }
  }

  public render() {
    let navigation = <AuthNavigationRouter onNavigationStateChange={this.props.onNavigationStateChange} />;
    if (this.props.customer.uid) {
      navigation = <NavigationRouter onNavigationStateChange={this.props.onNavigationStateChange} />;
    }
    return navigation;
  }
}

const mapStateToProps = ({ auth }) => ({ authState: auth.authState, customer: auth.customer });
const mapDispatchToProps = dispatch => ({
  onLoadAuthState: () => dispatch(actions.loadAuthState()),
  onverifySession: (authState: AuthStateModel) => dispatch(actions.verifySession(authState)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Router);
