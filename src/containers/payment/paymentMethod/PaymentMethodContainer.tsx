import { Order } from '@favid-inc/api';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { OrderContext } from '../context';
import { PaymentMethod } from './PaymentMethod';

type Props = NavigationScreenProps;

type Context = typeof OrderContext;

export class PaymentMethodContainer extends Component<Props, any, Context> {
  static contextType = OrderContext;
  public context: React.ContextType<Context>;

  public componentDidMount() {
    const { navigation } = this.props;

    const order: Order = navigation.getParam('order');

    this.context.setId(order.id);
    this.context.setArtistId(order.artistId);
    this.context.setPrice(order.price);
  }

  public onSend = () => {
    this.props.navigation.navigate('Dados Pessoais');
  };

  public render() {
    return <PaymentMethod onSend={this.onSend} />;
  }
}
