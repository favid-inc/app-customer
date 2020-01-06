import { Order } from '@favid-inc/api';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Text } from '@kitten/ui';

type Props = NavigationScreenProps;

interface State {
  order?: Order;
}

export class CancelContainer extends Component<Props, State> {

  public render() {
    return (
      <Text>teste</Text>
    );
  }
}
