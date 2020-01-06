import { Order } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, List, Text } from '@kitten/ui';
import { textStyle } from '@src/components/common';
import { Video } from 'expo-av';
import React, { Component } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import Modal from 'react-native-modal';

import { OrderCard } from './orderCard';
import { OrderCardProps } from './orderCard/OrderCard';

interface Props {
  onDetails: (order: Order) => void;
  orders: Order[];
}

interface State {
  order: Order;
}

class OrdersComponent extends Component<ThemedComponentProps & Props, State> {
  public state: State = {
    order: null,
  };

  public render() {
    const { themedStyle, orders } = this.props;
    if (!orders || !orders.length) {
      return (
        <View style={themedStyle.container}>
          <Text style={themedStyle.subtitle} appearance='hint'>
            Nenhum pedido.
          </Text>
        </View>
      );
    }

    return (
      <View style={themedStyle.container}>
        <List contentContainerStyle={themedStyle.container} renderItem={this.renderItem} data={orders} />
        <Modal
          isVisible={Boolean(this.state.order && this.state.order.videoUri)}
          onBackdropPress={this.onModalRequestClose}
        >
          {this.state.order ? (
            <Video
              resizeMode={Video.RESIZE_MODE_COVER}
              shouldPlay={true}
              source={{ uri: this.state.order.videoUri }}
              style={{ height: '80%', backgroundColor: 'black' }}
              useNativeControls={true}
            />
          ) : (
            <View style={{ height: '80%', backgroundColor: 'black' }} />
          )}
          <Button appearance='filled' onPress={this.onModalRequestClose} size='giant' status='info'>
            Fechar
          </Button>
        </Modal>
      </View>
    );
  }

  private onDetails = (order: Order) => {
    if (order.videoUri) {
      this.setState({ order });
    } else {
      this.props.onDetails(order);
    }
  };

  private onModalRequestClose = () => {
    this.setState({ order: null });
  };

  private renderItem = (info: ListRenderItemInfo<Order>): React.ReactElement<OrderCardProps> => {
    const { themedStyle } = this.props;
    return <OrderCard key={info.item.id} style={themedStyle.item} order={info.item} onPress={this.onDetails} />;
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
