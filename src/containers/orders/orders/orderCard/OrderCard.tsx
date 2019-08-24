import { Order, OrderPaymentStatus as OrderPaymentStatusType } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, ButtonGroup, Text } from '@kitten/ui';
import { ActivityAuthoring, textStyle } from '@src/components/common';
import { ShareIconOutline, HeartIconFill } from '../../../../assets/icons';
import React from 'react';
import { ImageBackground, TouchableOpacity, TouchableOpacityProps, View, Share } from 'react-native';
import { OrderCardBottom } from './OrderCardBottom';
import { OrderPaymentStatus } from './OrderPaymentStatus';
import { OrderStatus } from './OrderStatus';

// @ts-ignore (override `onPress` prop)
interface ComponentProps extends TouchableOpacityProps {
  order: Order;
  onPress: (order: Order) => void;
}

export type OrderCardProps = ThemedComponentProps & ComponentProps;

class OrderCardComponent extends React.Component<OrderCardProps> {
  public onShare = async () => {
    Share.share(
      {
        title: `Meu Video do Favid do Artista: ${this.props.order.artistName}`,
        message: '',
        url: this.props.order.videoThumbnailUri,
      },
      {},
    );
  };

  public onLike = () => {
    console.log('like');
  };

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
              <Button onPress={this.onShare} size='giant' status='info' icon={ShareIconOutline} appearance='ghost' />
              <Button
                onPress={this.onLike}
                size='giant'
                status={isLiked ? 'success' : 'danger'}
                icon={HeartIconFill}
                appearance='ghost'
              />
            </View>
          </View>
          <Text style={themedStyle.descriptionLabel} appearance='hint' category='s1'>
            {order.instructions}
          </Text>
        </View>
        <OrderCardBottom style={themedStyle.activityContainer}>
          <ActivityAuthoring
            photo={{ uri: order.artistPhotoUri }}
            name={order.artistName}
            date={new Date(order.statusPlacedDate).toLocaleDateString()}
          />
          {order.paymentStatus === OrderPaymentStatusType.PENDING ? (
            <OrderPaymentStatus status={order.paymentStatus} />
          ) : (
            <OrderStatus status={order.status} />
          )}
        </OrderCardBottom>
      </TouchableOpacity>
    );
  }

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
