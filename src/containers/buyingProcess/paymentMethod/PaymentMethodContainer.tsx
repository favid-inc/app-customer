import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { BuyingProcessContext } from '../context';
import { PaymentMethod } from './PaymentMethod';

type Props = NavigationScreenProps;

type Context = typeof BuyingProcessContext;

export class PaymentContainer extends Component<Props, any, Context> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<Context>;

  public componentDidMount() {
    const { navigation } = this.props;
    const order = navigation.getParam('order');
    this.context.setOrder(order);
  }

  public onSend = () => {
    this.props.navigation.navigate('Informações do Pedido');
  };

  public render() {
    return <PaymentMethod onSend={this.onSend} />;
  }
}
