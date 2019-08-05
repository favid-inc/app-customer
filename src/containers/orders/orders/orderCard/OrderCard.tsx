import React from 'react';
import { ImageBackground, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from 'react-native-ui-kitten/theme';
import { Text } from 'react-native-ui-kitten/ui';
import { OrderCardBottom } from './OrderCardBottom';
import { ActivityAuthoring, textStyle } from '@src/components/common';
import { OrderModel } from '@favid-inc/api';
import { OrderStatus } from './OrderStatus';
// @ts-ignore (override `onPress` prop)
interface ComponentProps extends TouchableOpacityProps {
  order: OrderModel;
  onPress: (order: OrderModel) => void;
}

export type OrderCardProps = ThemedComponentProps & ComponentProps;

class OrderCardComponent extends React.Component<OrderCardProps> {
  private onPress = () => {
    if (this.props.order.video) {
      this.props.onPress(this.props.order);
    }
  };

  public render(): React.ReactNode {
    const { style, themedStyle, order, ...restProps } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        {...restProps}
        style={[themedStyle.container, style]}
        onPress={this.onPress}
      >
        {order.videoThumb ? <ImageBackground style={themedStyle.image} source={{ uri: order.videoThumb }} /> : null}
        <View style={themedStyle.infoContainer}>
          <Text style={themedStyle.descriptionLabel} appearance='hint' category='s2'>
            {order.isGift ? order.theirName : order.customerName}
          </Text>
          <Text style={themedStyle.descriptionLabel} appearance='hint' category='s1'>
            {order.videoInstructions}
          </Text>
        </View>
        <OrderCardBottom style={themedStyle.activityContainer}>
          <ActivityAuthoring
            photo={{ uri: order.artistPhoto }}
            name={order.artistName}
            date={new Date(order.creationDate).toDateString()}
          />
          <OrderStatus status={order.status} />
        </OrderCardBottom>
      </TouchableOpacity>
    );
  }
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
