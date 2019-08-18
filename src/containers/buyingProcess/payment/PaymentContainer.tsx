import { CreditCard } from '@src/core/model';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { BuyingProcessContext } from '../context';
import { Payment } from './Payment';

interface State {
  loading: boolean;
}

interface CreditCardContainerProps {
  idToken: string;
}

type Props = CreditCardContainerProps & NavigationScreenProps;

class Container extends Component<Props, State, typeof BuyingProcessContext> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public state: State = {
    loading: false,
  };

  public onSend = (creditCard: CreditCard) => {
    this.setState({ loading: true });

    this.context.setCreditCard(creditCard);

    this.setState({ loading: false });

    this.props.navigation.navigate('Informações do Pedido');
  };

  public render(): React.ReactNode {
    const { loading } = this.state;
    return <Payment loading={loading} onSend={this.onSend} />;
  }
}

const mapStateToProps = ({ auth }) => ({
  idToken: auth.authState.idToken,
});

export const PaymentContainer = connect(mapStateToProps)(Container);
