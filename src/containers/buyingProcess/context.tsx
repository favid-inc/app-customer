import { Order } from '@favid-inc/api';
import { PayOrder } from '@favid-inc/api/lib/app-customer';

import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationContainer } from 'react-navigation';

export type Payer = PayOrder['Request']['data']['directCharge']['payer'];
export type CreditCard = PayOrder['Request']['data']['paymentToken'];

interface Context {
  order?: Order;
  // chargeData?: ChargeResponse;
  setOrder?: (order: Order) => void;
  creditCard?: CreditCard;
  payer?: Payer;
  setCreditCard?: (creditCard: CreditCard) => void;
  // setChargeData?: (chargeData: ChargeResponse) => void;
  setPayer?: (payer: Payer) => void;
}

export const BuyingProcessContext = React.createContext<Context>({});

type Props = NavigationScreenProps;
type State = Context;

export function connect(Navigator: NavigationContainer) {
  class ContextNavigator extends React.Component<Props, State> {
    static router = Navigator.router;
    static screenProps = Navigator.screenProps;
    static navigationOptions = Navigator.navigationOptions;

    public state: Context = {
      order: {},
      creditCard: {},
      payer: {},
      setOrder: (order: Order) => this.setState({ order }),
      setCreditCard: (creditCard) => this.setState({ creditCard }),
      setPayer: (payer) => this.setState({ payer }),
    };

    public render() {
      return (
        <BuyingProcessContext.Provider value={this.state}>
          <BuyingProcessContext.Consumer>{() => <Navigator {...this.props} />}</BuyingProcessContext.Consumer>
        </BuyingProcessContext.Provider>
      );
    }
  }

  return ContextNavigator;
}
