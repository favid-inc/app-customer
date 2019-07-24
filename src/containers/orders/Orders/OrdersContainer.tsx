import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { Orders } from './Orders';
import * as actions from '../../../store/actions/index';
import { OrderModel } from '@favid-inc/api';

interface ComponentProps {
  userId: any;
  orders: OrderModel[];
  onGetOrders: (userId: string) => void;
}

type Props = NavigationScreenProps & ComponentProps;

class OrdersContainerComponent extends Component<Props> {
  public componentWillMount() {
    this.props.onGetOrders(this.props.userId);
  }

  public onDetails(order: OrderModel) {
    console.log('[OrdersContainer.tsx] onDetails() order: ', order);
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
  onGetOrders: (userId: string) => dispatch(actions.getOrders(userId)),
});
export const OrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersContainerComponent);
