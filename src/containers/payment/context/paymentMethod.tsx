import { PayOrder } from '@favid-inc/api/lib/app-customer';
import React from 'react';

export type PaymentMethod = PayOrder['Request']['data']['paymentMethod'];

interface Props {
  children: React.ReactNode;
}

interface State extends PaymentMethod {
  setCardCvv: (card_cvv: PaymentMethod['card_cvv']) => void;
  setCardExpirationDate: (card_expiration_date: PaymentMethod['card_expiration_date']) => void;
  setCardHash: (card_hash: PaymentMethod['card_hash']) => void;
  setCardHolderName: (card_holder_name: PaymentMethod['card_holder_name']) => void;
  setCardNumber: (card_number: PaymentMethod['card_number']) => void;
  setPaymentMethod: (payment_method: PaymentMethod['payment_method']) => void;
  isValid: () => boolean;
}

export const PaymentMethodContext = React.createContext<State>(null);

export class PaymentMethodContextProvider extends React.Component<Props, State> {
  public state: State = {
    payment_method: 'credit_card',
    setCardCvv: (card_cvv) => this.setState({ card_cvv }),
    setCardExpirationDate: (card_expiration_date) => this.setState({ card_expiration_date }),
    setCardHash: (card_hash) => this.setState({ card_hash }),
    setCardHolderName: (card_holder_name) => this.setState({ card_holder_name }),
    setCardNumber: (card_number) => this.setState({ card_number }),
    setPaymentMethod: (payment_method) => this.setState({ payment_method }),
    isValid: () =>
      this.state.payment_method === 'credit_card' && Boolean(this.state.card_cvv && this.state.card_expiration_date && this.state.card_number && this.state.card_holder_name)
      || this.state.payment_method === 'boleto',
  };

  public render() {
    return (
      <PaymentMethodContext.Provider value={this.state}>
        <PaymentMethodContext.Consumer>{() => this.props.children}</PaymentMethodContext.Consumer>
      </PaymentMethodContext.Provider>
    );
  }
}
