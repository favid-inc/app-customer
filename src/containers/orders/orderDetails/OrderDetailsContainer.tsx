import { Order } from '@favid-inc/api';
import React, { Component } from 'react';
import { OrderDetails } from './OrderDetails';
interface ComponentProps {
  order: Order;
}

export class OrderDetailsContainer extends Component<ComponentProps> {
  public render(): React.ReactNode {
    return <OrderDetails order={{}} />;
  }
}
