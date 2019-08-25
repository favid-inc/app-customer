import { Order } from '@favid-inc/api';
import React, { Component } from 'react';
import { VideoPlayer } from './videoPlayer';
interface Props {
  order: Order;
}

export class OrderDetails extends Component<Props> {
  public render() {
    const { order } = this.props;
    return <VideoPlayer uri={order.videoUri} />;
  }
}
