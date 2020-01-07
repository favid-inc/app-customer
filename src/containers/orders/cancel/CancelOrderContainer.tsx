import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Order } from '@favid-inc/api';

import { CancelOrder } from './CancelOrder';

export type Props = NavigationScreenProps;

export class CancelOrderContainer extends React.Component<Props> {
  public render() {
    const order: Order = this.props.navigation.getParam('order');

    return (
      <CancelOrder order={order} />
    );
  }
}
