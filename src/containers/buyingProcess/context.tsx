import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationContainer } from 'react-navigation';
import { OrderModel } from '@favid-inc/api';
import { PaymentResponse, ChargeResponse, Customer } from '@src/core/model';

export interface IBuyingProcessContext {
  order?: OrderModel;
  chargeData?: ChargeResponse;
  setOrder?: (order: OrderModel) => void;
  paymentData?: PaymentResponse;
  customer?: Customer;
  setPaymentData?: (paymentData: PaymentResponse) => void;
  setChargeData?: (chargeData: ChargeResponse) => void;
  setCustomer?: (customer: Customer) => void;
}

export const BuyingProcessContext = React.createContext<IBuyingProcessContext>({});
export function connect(Navigator: NavigationContainer) {
  class ContextNavigator extends React.Component<NavigationScreenProps, IBuyingProcessContext> {
    public state: IBuyingProcessContext = {
      order: {},
      chargeData: {},
      paymentData: {},
      customer: {},
      setOrder: (order: OrderModel) => this.setState({ order }),
      setPaymentData: (paymentData: PaymentResponse) => this.setState({ paymentData }),
      setChargeData: (chargeData: ChargeResponse) => this.setState({ chargeData }),
      setCustomer: (customer: Customer) => this.setState({ customer }),
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
