import { MaterialIcons } from '@expo/vector-icons';
import { OrderStatus as OrderStatusType } from '@favid-inc/api';
import { SocialOrder as Order } from '@favid-inc/api/lib/app-customer';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import React from 'react';
import { ImageBackground, Linking, Platform, Share, StyleProp, View, ViewStyle, TouchableOpacity } from 'react-native';

import { FlagIconFill, HeartIconFill, HeartIconOutline, ShareIconOutline } from '@src/assets/icons';
import { textStyle } from '@src/components/common';
import { likeOrder } from './likeOrder';
import { unlikeOrder } from './unLikeOrder';

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
        {order.videoThumbnailUri && (
          <TouchableOpacity style={themedStyle.parameterContainer} onPress={this.onPress}>
            <ImageBackground style={{ height: 220 }} source={{ uri: order.videoThumbnailUri }}>
              <MaterialIcons
                name='play-arrow'
                size={100}
                color='#FFF'
                style={{
                  textAlign: 'center',
                  top: 60,
                }}
              />
            </ImageBackground>
          </TouchableOpacity>
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
      </View>
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
      sending: true,
      order: {
        ...this.state.order,
        like: !like,
        likes: likes + (like ? -1 : +1),
      },
    });
    try {
      const order = like ? await unlikeOrder({ orderId }) : await likeOrder({ orderId });
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
    <Button onPress={onShare} size='small' status='info' icon={ShareIconOutline} appearance='ghost' />
    <Button
      onPress={onLike}
      disabled={sending}
      size='small'
      status='danger'
      icon={order.like ? HeartIconFill : HeartIconOutline}
      appearance='ghost'
    />
    <Button onPress={onReport} size='small' status='warning' icon={FlagIconFill} appearance='ghost' />
  </View>
);

export const OrderCard = withStyles<ComponentProps>(OrderCardComponent, (theme: ThemeType) => ({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '94%',
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
  descriptionLabel: {
    marginTop: 16,
    ...textStyle.subtitle,
  },
}));
