import { Order, OrderPaymentStatus } from '@favid-inc/api';
import React, { Component } from 'react';
import { Alert, Linking, RefreshControl, ScrollView } from 'react-native';
import { NavigationEventSubscription, NavigationScreenProps } from 'react-navigation';

import { listOrders } from './listOrders';
import { Orders } from './Orders';
import { readOrderTransaction } from './readOrderTransaction';

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

  private didFocusSubscription: NavigationEventSubscription;

  public componentWillUnmount() {
    if (this.didFocusSubscription) {
      this.didFocusSubscription.remove();
    }
  }

  public async componentDidMount() {
    const { navigation } = this.props;

    this.didFocusSubscription = navigation.addListener('didFocus', () => this.handleRefresh());

    this.handleRefresh();
  }

  public render() {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.handleRefresh} />}>
        {!this.state.loading && <Orders orders={this.state.orders} onDetails={this.onDetails} />}
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

  private onDetails = async (order: Order) => {
    if (order.videoUri) {
      this.props.navigation.navigate('Detalhes do Pedido', { order });
      return;
    }

    if (!order.pagarMeTransactionId) {
      this.props.navigation.navigate('Pagamento', { order });
      return;
    }

    const transaction = await readOrderTransaction({ orderId: order.id });

    if (order.paymentStatus !== transaction.status) {
      this.handleRefresh();
      return;
    }

    if (transaction.status === OrderPaymentStatus.WAITING_PAYMENT && transaction.payment_method === 'boleto') {
      Linking.openURL(transaction.boleto_url);
      return;
    }

    if (transaction.status === OrderPaymentStatus.REFUSED) {
      this.props.navigation.navigate('Pagamento', { order });
      return;
    }
  };
}
