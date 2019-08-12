import React from 'react';

import { NavigationRouteConfigMap, createStackNavigator } from 'react-navigation';
import { BookingNavigation } from './booking';
import { PaymentNavigator } from './payment';
import { OrderInfoNavigator } from './orderInfo';
import { connect } from './context';
import { TopBarNavigationOptions } from '@src/core/navigation/options';

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
