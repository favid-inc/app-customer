import React, { Component } from 'react';
import { OrderModel } from '@favid-inc/api';
import { List } from 'react-native-ui-kitten/ui';
import { withStyles, ThemeType, ThemedComponentProps } from 'react-native-ui-kitten/theme';
import { ListRenderItemInfo, ActivityIndicator } from 'react-native';
import { OrderCard } from './orderCard';
import { OrderCardProps } from './orderCard/OrderCard';

interface Props {
  orders: OrderModel[];
  onDetails: (order: OrderModel) => void;
}

class OrdersComponent extends Component<ThemedComponentProps & Props> {
  private renderItem = (info: ListRenderItemInfo<OrderModel>): React.ReactElement<OrderCardProps> => {
    const { themedStyle } = this.props;
    return <OrderCard style={themedStyle.item} order={info.item} onPress={this.onDetails.bind(this)} />;
  };

  public onDetails(order: OrderModel) {
    this.props.onDetails(order);
  }

  public render(): React.ReactNode {
    const { themedStyle, orders } = this.props;
    return this.props.orders ? (
      <List contentContainerStyle={themedStyle.container} renderItem={this.renderItem} data={orders} />
    ) : (
      <ActivityIndicator size='large' />
    );
  }
}

export const Orders = withStyles(OrdersComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme['background-basic-color-2'],
  },
  item: {
    marginVertical: 8,
    backgroundColor: theme['background-basic-color-1'],
  },
}));
