import { Order } from '@favid-inc/api';
import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { OrderDetails } from './OrderDetails';

type Props = NavigationScreenProps;

interface State {
  order: Order;
}

export class OrderDetailsContainer extends React.Component<Props, State> {
  public state: State = {
    order: null,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    const order = navigation.getParam('order');
    this.setState({ order });
  }

  public render() {
    const { order } = this.state;
    return order ? <OrderDetails order={this.state.order} /> : <View />;
  }
}
