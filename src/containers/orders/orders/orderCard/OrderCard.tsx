import { OrderPaymentStatus as OrderPaymentStatusType, OrderStatus as OrderStatusType } from '@favid-inc/api';
import { SocialOrder as Order } from '@favid-inc/api/lib/app-customer';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import React from 'react';
import { ImageBackground, Linking, Platform, Share, StyleProp, View, ViewStyle, TouchableOpacity } from 'react-native';

import { FlagIconFill, HeartIconFill, HeartIconOutline, ShareIconOutline } from '@src/assets/icons';
import { ActivityAuthoring, textStyle } from '@src/components/common';
import { likeOrder } from './likeOrder';
import { OrderCardBottom } from './OrderCardBottom';
import { OrderPaymentStatus } from './OrderPaymentStatus';
import { OrderStatus } from './OrderStatus';
import { unLikeOrder } from './unLikeOrder';

interface ComponentProps {
  order: Order;
  onPress: (order: Order) => void;
  style: StyleProp<ViewStyle>;
}

interface State {
  order: Order;
  sending: boolean;
}

export type OrderCardProps = ThemedComponentProps & ComponentProps;

class OrderCardComponent extends React.Component<OrderCardProps, State> {
  public state: State = {
    order: {},
    sending: false,
  };

  public componentDidMount() {
    this.setState({ order: this.props.order });
  }

  public render() {
    const { style, themedStyle, ...restProps } = this.props;
    const { order } = this.state;

    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <TouchableOpacity
          activeOpacity={0}
          style={{
            opacity: 0.1,
            zIndex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
          }}
          onPress={() => {}}
        >
        </TouchableOpacity>
        {order.videoThumbnailUri && (
          <View style={themedStyle.parameterContainer}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  opacity: 0.3,
                  zIndex: 1,
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'black',
                }}
                onPress={() => {}}
              >
              </TouchableOpacity>
              <ImageBackground style={themedStyle.image} source={{ uri: order.videoThumbnailUri }} />
            </View>
        )}
        <View style={themedStyle.infoContainer}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={themedStyle.descriptionLabel} appearance='hint' category='s2'>
                {order.isGift ? order.receiverName : order.customerName}
              </Text>
            </View>
            <SocialButtons
              sending={this.state.sending}
              order={order}
              onLike={this.onLike}
              onReport={this.onReport}
              onShare={this.onShare}
            />
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
          {order.paymentStatus === OrderPaymentStatusType.WAITING_PAYMENT ? (
            <OrderPaymentStatus status={order.paymentStatus} />
          ) : (
            <OrderStatus status={order.status} />
          )}
        </OrderCardBottom>
        {this.renderActionButton(order.status, order.paymentStatus, this.onPress)}
      </View>
    );
  }

  private renderActionButton = (
    orderStatus: string,
    paymentStatus: string,
    onPress: () => void,
  ): React.ReactElement => {
    const statusColor = {
      [OrderPaymentStatusType.WAITING_PAYMENT]: 'danger',
      [OrderStatusType.FULFILLED]: 'success',
    };

    const statusText = {
      [OrderPaymentStatusType.WAITING_PAYMENT]: 'Efetuar Pagamento',
      [OrderStatusType.FULFILLED]: 'Ver Vídeo',
    };

    const status = statusColor[paymentStatus] ? statusColor[paymentStatus] : statusColor[orderStatus];
    const text = statusText[paymentStatus] ? statusText[paymentStatus] : statusText[orderStatus];
    if (status) {
      return (
        <Button status={status} style={{ borderRadius: 0, zIndex: 2 }} size='giant' onPress={onPress}>
          {text}
        </Button>
      );
    }
  };

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
      sending: true,
      order: {
        ...this.state.order,
        like: !like,
        likes: likes + (like ? -1 : +1),
      },
    });
    try {
      const order = like ? await unLikeOrder({ orderId }) : await likeOrder({ orderId });
      this.setState({ order });
    } finally {
      this.setState({ sending: false });
    }
  };

  private onReport = () => {
    Linking.openURL(`mailto:suporte.favid@gmail.com?subject=Reportar Pedido - ${this.state.order.id}`);
  };

  private onPress = () => {
    this.props.onPress(this.state.order);
  };
}

const SocialButtons = ({ order, onLike, onReport, onShare, sending }) => (
  <View style={{ flexDirection: 'row' }}>
    {order.status === OrderStatusType.FULFILLED && (
      <Button onPress={onShare} size='small' status='info' icon={ShareIconOutline} appearance='ghost' />
    )}
    {order.status === OrderStatusType.FULFILLED && (
      <Button
        disabled={sending}
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
    minWidth: 300,
    maxWidth: 450,
    alignSelf: 'center',
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
