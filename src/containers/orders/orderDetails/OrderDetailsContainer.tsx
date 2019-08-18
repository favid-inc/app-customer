import { Order } from '@favid-inc/api';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderDetails } from './OrderDetails';
interface ComponentProps {
  order: Order;
}

class OrderDetailsContainerComponent extends Component<ComponentProps> {
  public render(): React.ReactNode {
    return <OrderDetails order={this.props.order} />;
  }
}

const mapStateToProps = ({ order }) => ({
  order: order.order,
});

export const OrderDetailsContainer = connect(mapStateToProps)(OrderDetailsContainerComponent);
