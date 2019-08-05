import React, { Component } from 'react';
import { withStyles, ThemeType, ThemedComponentProps } from 'react-native-ui-kitten/theme';
import { ContainerView } from '@src/components/common';
import { OrderModel } from '@favid-inc/api';
import { Video } from 'expo-av';
import { View } from 'react-native';
import { VideoPlayer } from './videoPlayer';

interface Props {
  order: OrderModel;
}

class OrderDetailsComponent extends Component<ThemedComponentProps & Props> {
  public render(): React.ReactNode {
    const { themedStyle, order } = this.props;
    return <VideoPlayer uri={order.video} />;
  }
}

export const OrderDetails = withStyles(OrderDetailsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
