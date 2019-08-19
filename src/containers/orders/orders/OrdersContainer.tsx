import { Order } from '@favid-inc/api';
import React, { Component } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Orders } from './Orders';

interface ComponentProps {
  userId: any;
  orders: Order[];
  loading: boolean;
  onSetOrder: (order: Order) => void;
  onGetOrders: (userId: string) => void;
}

type Props = NavigationScreenProps & ComponentProps;

class OrdersContainerComponent extends Component<Props> {
  public componentWillMount() {
    this.onRefresh();
  }

  public render(): React.ReactNode {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.onRefresh} />}>
        <Orders orders={this.props.orders} onDetails={this.onDetails} />
      </ScrollView>
    );
  }

  private onRefresh = () => this.props.onGetOrders(this.props.userId);

  private onDetails = (order: Order) => {
    this.props.onSetOrder(order);
    this.props.navigation.navigate('Detalhes do Pedido');
  };
}

const mapStateToProps = ({ order, auth }) => ({
  loading: order.loading,
  orders: order.orders,
});

const mapDispatchToProps = (dispatch) => ({
  onSetOrder: (order: Order) => dispatch(actions.setOrder(order)),
  onGetOrders: () => dispatch(actions.getOrders()),
});

export const OrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersContainerComponent);
