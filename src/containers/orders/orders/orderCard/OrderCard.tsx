import { Order } from '@favid-inc/api';
import { ActivityAuthoring, textStyle } from '@src/components/common';
import React from 'react';
import { ImageBackground, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from 'react-native-ui-kitten/theme';
import { Text } from 'react-native-ui-kitten/ui';
import { OrderCardBottom } from './OrderCardBottom';
import { OrderStatus } from './OrderStatus';
// @ts-ignore (override `onPress` prop)
interface ComponentProps extends TouchableOpacityProps {
  order: Order;
  onPress: (order: Order) => void;
}

export type OrderCardProps = ThemedComponentProps & ComponentProps;

class OrderCardComponent extends React.Component<OrderCardProps> {

  public render(): React.ReactNode {
    const { style, themedStyle, order, ...restProps } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        {...restProps}
        style={[themedStyle.container, style]}
        onPress={this.onPress}
      >
        {order.videoThumbnailUri ? (
          <ImageBackground style={themedStyle.image} source={{ uri: order.videoThumbnailUri }} />
        ) : null}
        <View style={themedStyle.infoContainer}>
          <Text style={themedStyle.descriptionLabel} appearance='hint' category='s2'>
            {order.isGift ? order.receiverName : order.customerName}
          </Text>
          <Text style={themedStyle.descriptionLabel} appearance='hint' category='s1'>
            {order.instructions}
          </Text>
        </View>
        <OrderCardBottom style={themedStyle.activityContainer}>
          <ActivityAuthoring
            photo={{ uri: order.artistPhotoUri }}
            name={order.artistName}
            date={new Date(order.statusPlacedDate).toDateString()}
          />
          <OrderStatus status={order.status} />
        </OrderCardBottom>
      </TouchableOpacity>
    );
  }
  private onPress = () => {
    if (this.props.order.videoUri) {
      this.props.onPress(this.props.order);
    }
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
