import { Order } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import React, { Component } from 'react';
import { VideoPlayer } from './videoPlayer';
interface Props {
  order: Order;
}

class OrderDetailsComponent extends Component<ThemedComponentProps & Props> {
  public render() {
    const { order } = this.props;
    return <VideoPlayer uri={order.videoUri} />;
  }
}

export const OrderDetails = withStyles(OrderDetailsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
