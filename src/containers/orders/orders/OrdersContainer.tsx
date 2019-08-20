import { Order } from '@favid-inc/api';
import React, { Component } from 'react';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { listOrders } from './listOrders';
import { Orders } from './Orders';

type Props = NavigationScreenProps;

interface State {
  orders: Order[];
  loading: boolean;
}

export class OrdersContainer extends Component<Props, State> {
  public state: State = {
    orders: [],
    loading: false,
  };

  public componentDidMount() {
    this.handleRefresh();
  }

  public render() {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.handleRefresh} />}>
        <Orders orders={this.state.orders} onDetails={this.onDetails} />
      </ScrollView>
    );
  }

  private handleRefresh = async () => {
    this.setState({ loading: true });
    try {
      const orders = await listOrders();
      this.setState({ orders });
    } catch (e) {
      Alert.alert('Erro ao listar pedidos');
    } finally {
      this.setState({ loading: false });
    }
  };

  private onDetails = (order: Order) => {
    this.props.navigation.navigate('Detalhes do Pedido', {
      order,
    });
  };
}
