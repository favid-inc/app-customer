import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Orders } from './Orders';
import { OrderModel } from '@favid-inc/api';
import * as actions from '../../../store/actions/index';
import { NavigationScreenProps } from 'react-navigation';
import { ScrollView, RefreshControl } from 'react-native';

interface ComponentProps {
  userId: any;
  orders: OrderModel[];
  loading: boolean;
  onSetOrder: (order: OrderModel) => void;
  onGetOrders: (userId: string) => void;
}

type Props = NavigationScreenProps & ComponentProps;

class OrdersContainerComponent extends Component<Props> {
  public componentWillMount() {
    this.onRefresh();
  }

  private onRefresh = () => this.props.onGetOrders(this.props.userId);

  private onDetails = (order: OrderModel) => {
    this.props.onSetOrder(order);
    this.props.navigation.navigate('Detalhes do Pedido');
  };

  public render(): React.ReactNode {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.onRefresh} />}>
        <Orders orders={this.props.orders} loading={this.props.loading} onDetails={this.onDetails} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ order, auth }) => ({
  loading: order.loading,
  userId: auth.authState.uid,
  orders: order.orders,
});

const mapDispatchToProps = dispatch => ({
  onSetOrder: (order: OrderModel) => dispatch(actions.setOrder(order)),
  onGetOrders: (userId: string) => dispatch(actions.getOrders(userId)),
});

export const OrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersContainerComponent);
