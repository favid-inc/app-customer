import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { BuyingProcessContext } from '../context';
import { Payment } from './Payment';

import { CreditCard } from '../context';

interface State {
  loading: boolean;
}

interface CreditCardContainerProps {
  idToken: string;
}

type Props = CreditCardContainerProps & NavigationScreenProps;

type Context = typeof BuyingProcessContext;

export class PaymentContainer extends Component<Props, State, Context> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<Context>;

  public state: State = {
    loading: false,
  };

  public onSend = (creditCard: CreditCard) => {
    this.setState({ loading: true });

    this.context.setCreditCard(creditCard);

    this.setState({ loading: false });

    this.props.navigation.navigate('Informações do Pedido');
  };

  public render() {
    const { loading } = this.state;
    return <Payment loading={loading} onSend={this.onSend} />;
  }
}
