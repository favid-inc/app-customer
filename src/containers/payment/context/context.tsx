import { PayOrder } from '@favid-inc/api/lib/app-customer';
import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationContainer } from 'react-navigation';

import { AddressContextProvider } from './address';
import { CustomerContextProvider } from './customer';
import { OrderContextProvider } from './order';
import { PaymentMethodContextProvider } from './paymentMethod';

type Payload = PayOrder['Request']['data'];

export type PaymentMethod = Payload['paymentMethod'];

type Props = NavigationScreenProps;

export function connect(Navigator: NavigationContainer) {
  class ContextNavigator extends React.Component<Props> {
    static router = Navigator.router;
    static screenProps = Navigator.screenProps;
    static navigationOptions = Navigator.navigationOptions;

    public render() {
      return (
        <CustomerContextProvider>
          <AddressContextProvider>
            <PaymentMethodContextProvider>
              <OrderContextProvider>
                <Navigator {...this.props} />
              </OrderContextProvider>
            </PaymentMethodContextProvider>
          </AddressContextProvider>
        </CustomerContextProvider>
      );
    }
  }

  return ContextNavigator;
}
