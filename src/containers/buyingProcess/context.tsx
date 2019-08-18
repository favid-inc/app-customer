import { Order } from '@favid-inc/api';
import { ChargeResponse, Customer, PaymentResponse } from '@src/core/model';
import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationContainer } from 'react-navigation';
import { connect as reduxConnect } from 'react-redux';
interface Context {
  order?: Order;
  chargeData?: ChargeResponse;
  setOrder?: (order: Order) => void;
  paymentData?: PaymentResponse;
  customer?: Customer;
  setPaymentData?: (paymentData: PaymentResponse) => void;
  setChargeData?: (chargeData: ChargeResponse) => void;
  setCustomer?: (customer: Customer) => void;
}
interface OrderInfoContainerProps {
  idToken: string;
  customer: Customer;
}

export const BuyingProcessContext = React.createContext<Context>({});
export function connect(Navigator: NavigationContainer) {
  class ContextNavigator extends React.Component<NavigationScreenProps & OrderInfoContainerProps, Context> {
    static router = Navigator.router;
    static screenProps = Navigator.screenProps;
    static navigationOptions = Navigator.navigationOptions;
    public state: Context = {
      order: {},
      chargeData: {},
      paymentData: {},
      customer: {},
      setOrder: (order: Order) => this.setState({ order }),
      setPaymentData: (paymentData: PaymentResponse) => this.setState({ paymentData }),
      setChargeData: (chargeData: ChargeResponse) => this.setState({ chargeData }),
      setCustomer: (customer: Customer) => this.setState({ customer }),
    };

    public componentWillMount() {
      this.state.setCustomer(this.props.customer);
    }

    public render() {
      return (
        <BuyingProcessContext.Provider value={this.state}>
          <BuyingProcessContext.Consumer>{() => <Navigator {...this.props} />}</BuyingProcessContext.Consumer>
        </BuyingProcessContext.Provider>
      );
    }
  }
  const mapStateToProps = ({ auth }) => ({
    idToken: auth.authState.idToken,
    customer: auth.customer,
  });

  return reduxConnect(mapStateToProps)(ContextNavigator);
}
