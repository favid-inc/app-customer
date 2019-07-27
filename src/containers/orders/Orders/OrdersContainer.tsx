import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { Orders } from './Orders';
import * as actions from '../../../store/actions/index';
import { OrderModel } from '@favid-inc/api';

interface ComponentProps {
  userId: any;
  orders: OrderModel[];
  onSetOrder: (order: OrderModel) => void;
  onGetOrders: (userId: string) => void;
}

type Props = NavigationScreenProps & ComponentProps;

class OrdersContainerComponent extends Component<Props> {
  public componentWillMount() {
    this.props.onGetOrders(this.props.userId);
  }

  public onDetails(order: OrderModel) {
    this.props.onSetOrder(order);
    this.props.navigation.navigate('Detalhes do Pedido');
  }

  public render(): React.ReactNode {
    return <Orders orders={this.props.orders} onDetails={this.onDetails.bind(this)} />;
  }
}

const mapStateToProps = ({ order, auth }) => ({
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
