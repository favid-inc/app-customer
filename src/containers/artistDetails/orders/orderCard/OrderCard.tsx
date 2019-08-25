import { Order } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import React from 'react';
import { ImageBackground, Share, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { HeartIconFill, ShareIconOutline } from '@src/assets/icons';
import { ActivityAuthoring, textStyle } from '@src/components/common';
import { OrderCardBottom } from './OrderCardBottom';

interface ComponentProps {
  order: Order;
  onPress: (order: Order) => void;
  style: StyleProp<ViewStyle>;
}

export type OrderCardProps = ThemedComponentProps & ComponentProps;

class OrderCardComponent extends React.Component<OrderCardProps> {
  public isLiked = (): boolean => {
    return true;
  };

  public render() {
    const { style, themedStyle, order, ...restProps } = this.props;
    const isLiked: boolean = this.isLiked();
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        {...restProps}
        style={[themedStyle.container, style]}
        onPress={this.onPress}
      >
        {order.videoThumbnailUri && (
          <ImageBackground style={themedStyle.image} source={{ uri: order.videoThumbnailUri }} />
        )}
        <View style={themedStyle.infoContainer}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={themedStyle.descriptionLabel} appearance='hint' category='s2'>
                {order.isGift ? order.receiverName : order.customerName}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button onPress={this.onShare} size='large' status='info' icon={ShareIconOutline} appearance='ghost' />
              <Button
                onPress={this.onLike}
                size='large'
                status={isLiked ? 'success' : 'danger'}
                icon={HeartIconFill}
                appearance='ghost'
              />
            </View>
          </View>
        </View>
        <OrderCardBottom style={themedStyle.activityContainer}>
          <ActivityAuthoring
            photo={{ uri: order.artistPhotoUri }}
            name={order.artistArtisticName}
            date={new Date(order.statusPlacedDate).toLocaleDateString()}
          />
        </OrderCardBottom>
      </TouchableOpacity>
    );
  }

  // private onReport = () => {
  //   Linking.openURL(`mailto://suporte.favid@gmail.com?subject=Reportar Pedido #${this.props.order.id}`);
  // };

  private onLike = () => {
    console.log('like');
  };

  private onShare = () => {
    Share.share(
      {
        title: `Meu Video do Favid do Artista: ${this.props.order.artistArtisticName}`,
        message: '',
        url: this.props.order.videoThumbnailUri,
      },
      {},
    );
  };

  private onPress = () => {
    this.props.onPress(this.props.order);
  };
}

export const OrderCard = withStyles(OrderCardComponent, (theme: ThemeType) => ({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  activityContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  image: {
    height: 220,
  },
  descriptionLabel: {
    marginTop: 16,
    ...textStyle.subtitle,
  },
}));
