import { TopBarNavigationOptions } from '@src/core/navigation/options';
import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { BookingNavigation } from './booking';
import { connect } from './context';
import { OrderInfoNavigator } from './payer';
import { PaymentNavigator } from './payment';

const BuyingProcessNavigationMap: NavigationRouteConfigMap = {
  ...BookingNavigation,
  ...PaymentNavigator,
  ...OrderInfoNavigator,
};

export const BuyingProcessNavigation = connect(
  createStackNavigator(BuyingProcessNavigationMap, {
    headerMode: 'screen',
    defaultNavigationOptions: TopBarNavigationOptions,
  }),
);
