import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationContainer } from 'react-navigation';
import { OrderModel } from '@favid-inc/api';
import { PaymentResponse, ChargeResponse, Customer } from '@src/core/model';
import { connect as reduxConnect } from 'react-redux';
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
interface OrderInfoContainerProps {
  idToken: string;
  customer: Customer;
}

export const BuyingProcessContext = React.createContext<IBuyingProcessContext>({});
export function connect(Navigator: NavigationContainer) {
  class ContextNavigator extends React.Component<
    NavigationScreenProps & OrderInfoContainerProps,
    IBuyingProcessContext
  > {
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
