import React, { Component } from 'react';
import { OrderModel } from '@favid-inc/api';
import { List, Text } from 'react-native-ui-kitten/ui';
import { withStyles, ThemeType, ThemedComponentProps } from 'react-native-ui-kitten/theme';
import { ListRenderItemInfo, ActivityIndicator } from 'react-native';
import { OrderCard } from './orderCard';
import { OrderCardProps } from './orderCard/OrderCard';
import { ContainerView } from '@src/components/common';
import { textStyle } from '@src/components/common';

interface Props {
  loading: boolean;
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

    return this.props.loading ? <ActivityIndicator size='large' /> : list;
  }
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
