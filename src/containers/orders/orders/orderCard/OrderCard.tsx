import { OrderPaymentStatus as OrderPaymentStatusType, OrderStatus as OrderStatusType } from '@favid-inc/api';
import { SocialOrder as Order } from '@favid-inc/api/lib/app-customer';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import React from 'react';
import { Platform, StyleProp, ViewStyle, ImageBackground, Linking, Share, TouchableOpacity, View } from 'react-native';

import { FlagIconFill, HeartIconOutline, HeartIconFill, ShareIconOutline } from '@src/assets/icons';
import { ActivityAuthoring, textStyle } from '@src/components/common';
import { OrderCardBottom } from './OrderCardBottom';
import { OrderPaymentStatus } from './OrderPaymentStatus';
import { OrderStatus } from './OrderStatus';
import { likeOrder } from './likeOrder';
import { unLikeOrder } from './unLikeOrder';

interface ComponentProps {
  order: Order;
  onPress: (order: Order) => void;
  style: StyleProp<ViewStyle>;
}

interface State {
  order: Order;
}

export type OrderCardProps = ThemedComponentProps & ComponentProps;

class OrderCardComponent extends React.Component<OrderCardProps, State> {
  public state: State = {
    order: {},
  };

  public componentDidMount() {
    this.setState({ order: this.props.order });
  }

  public render() {
    const { style, themedStyle, ...restProps } = this.props;
    const { order } = this.state;

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
            <SocialButtons order={order} onLike={this.onLike} onReport={this.onReport} onShare={this.onShare} />
          </View>
          <Text style={themedStyle.descriptionLabel} appearance='hint' category='s1'>
            {order.instructions}
          </Text>
        </View>
        <OrderCardBottom style={themedStyle.activityContainer}>
          <ActivityAuthoring
            photo={{ uri: order.artistPhotoUri }}
            name={order.artistArtisticName}
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

  private onShare = async () => {
    const { artistArtisticName, videoUri } = this.state.order;
    Share.share(
      Platform.select({
        ios: {
          title: `Favid - Video exclusivo: ${artistArtisticName}`,
          url: videoUri,
        },
        android: {
          title: `Favid - Video exclusivo: ${artistArtisticName}`,
          message: `
            Favid - Video exclusivo: ${artistArtisticName}
            ${videoUri}
          `,
        },
      }),
    );
  };

  private onLike = async () => {
    const { id: orderId, like, likes } = this.state.order;

    this.setState({
      order: {
        ...this.state.order,
        like: !like,
        likes: likes + (like ? -1 : +1),
      },
    });

    const order = like ? await unLikeOrder({ orderId }) : await likeOrder({ orderId });
    this.setState({ order });
  };

  private onReport = () => {
    Linking.openURL(`mailto:suporte.favid@gmail.com?subject=Reportar Pedido - ${this.state.order.id}`);
  };

  private onPress = () => {
    this.props.onPress(this.state.order);
  };
}

const SocialButtons = ({ order, onLike, onReport, onShare }) => (
  <View style={{ flexDirection: 'row' }}>
    {order.status === OrderStatusType.FULFILLED && (
      <Button onPress={onShare} size='small' status='info' icon={ShareIconOutline} appearance='ghost' />
    )}
    {order.status === OrderStatusType.FULFILLED && (
      <Button
        onPress={onLike}
        size='small'
        status='danger'
        icon={order.like ? HeartIconFill : HeartIconOutline}
        appearance='ghost'
      />
    )}
    <Button onPress={onReport} size='small' status='warning' icon={FlagIconFill} appearance='ghost' />
  </View>
);

export const OrderCard = withStyles<ComponentProps>(OrderCardComponent, (theme: ThemeType) => ({
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
