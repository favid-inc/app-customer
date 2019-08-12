import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationContainer } from 'react-navigation';
import { OrderModel } from '@favid-inc/api';
import { PaymentResponse, ChargeResponse } from '@src/core/model';

export interface IBuyingProcessContext {
  order?: OrderModel;
  chargeData?: ChargeResponse;
  setOrder?: (order: OrderModel) => void;
  paymentData?: PaymentResponse;
  setPaymentData?: (paymentData: PaymentResponse) => void;
  setChargeData?: (chargeData: ChargeResponse) => void;
}

export const BuyingProcessContext = React.createContext<IBuyingProcessContext>({});
export function connect(Navigator: NavigationContainer) {
  class ContextNavigator extends React.Component<NavigationScreenProps, IBuyingProcessContext> {
    public state: IBuyingProcessContext = {
      order: null,
      setOrder: (order: OrderModel) => this.setState({ order }),
      paymentData: null,
      setPaymentData: (paymentData: PaymentResponse) => this.setState({ paymentData }),
      setChargeData: (chargeData: ChargeResponse) => this.setState({ chargeData }),
    };

    static router = Navigator.router;
    static screenProps = Navigator.screenProps;
    static navigationOptions = Navigator.navigationOptions;

    public render() {
      return (
        <BuyingProcessContext.Provider value={this.state}>
          <Navigator {...this.props} />
        </BuyingProcessContext.Provider>
      );
    }
  }

  return ContextNavigator;
}
