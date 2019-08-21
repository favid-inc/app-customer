import { Order } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { List, Text } from '@kitten/ui';
import { ContainerView } from '@src/components/common';
import { textStyle } from '@src/components/common';
import React, { Component } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { OrderCard } from './orderCard';
import { OrderCardProps } from './orderCard/OrderCard';

interface Props {
  orders: Order[];
  onDetails: (order: Order) => void;
}

class OrdersComponent extends Component<ThemedComponentProps & Props> {
  public render() {
    const { themedStyle, orders } = this.props;
    const list =
      orders && orders.length ? (
        <List contentContainerStyle={themedStyle.container} renderItem={this.renderItem} data={orders} />
      ) : (
        <ContainerView style={themedStyle.container}>
          <Text style={themedStyle.subtitle} appearance='hint'>
            Nenhum pedido.
          </Text>
        </ContainerView>
      );

    return list;
  }

  private onDetails = (order: Order) => {
    this.props.onDetails(order);
  };

  private renderItem = (info: ListRenderItemInfo<Order>): React.ReactElement<OrderCardProps> => {
    const { themedStyle } = this.props;
    return <OrderCard style={themedStyle.item} order={info.item} onPress={this.onDetails} />;
  };
}

export const Orders = withStyles(OrdersComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme['background-basic-color-1'],
  },
  subtitle: {
    marginVertical: 16,
    textAlign: 'center',
    ...textStyle.subtitle,
  },
  item: {
    marginVertical: 8,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
