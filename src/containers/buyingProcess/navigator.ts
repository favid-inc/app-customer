import { NavigationRouteConfigMap } from 'react-navigation';
import { BookingNavigation } from './booking';
import { CreditCardNavigator } from './payment';

export const BuyingProcessNavigationMap: NavigationRouteConfigMap = {
  ...BookingNavigation,
  ...CreditCardNavigator,
};
