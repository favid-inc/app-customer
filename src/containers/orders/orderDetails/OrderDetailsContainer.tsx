import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderModel } from '@favid-inc/api';
import { OrderDetails } from './OrderDetails';
interface ComponentProps {
  order: OrderModel;
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
