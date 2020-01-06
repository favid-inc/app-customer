import { MaterialIcons } from '@expo/vector-icons';
import { SocialOrder as Order } from '@favid-inc/api/lib/app-customer';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Text } from '@kitten/ui';
import React from 'react';
import { ImageBackground, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { textStyle } from '@src/components/common';
import { SocialButtons } from './social';

interface ComponentProps {
  onPress: (order: Order) => void;
  order: Order;
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

  public componentWillMount() {
    this.setState({ order: this.props.order });
  }

  public render() {
    const { style, themedStyle, ...restProps } = this.props;
    const { order } = this.state;

    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        {order.videoThumbnailUri && (
          <TouchableOpacity onPress={this.onPress}>
            <ImageBackground style={themedStyle.thumbmnail} source={{ uri: order.videoThumbnailUri }}>
              <MaterialIcons name='play-arrow' size={100} color='#FFF' style={themedStyle.playIcon} />
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
          </View>
          <SocialButtons order={order} />
          <Text style={themedStyle.descriptionLabel} appearance='hint' category='s1'>
            {order.instructions}
          </Text>
        </View>
      </View>
    );
  }

  private onPress = () => {
    this.props.onPress(this.state.order);
  };
}

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
  playIcon: {
    textAlign: 'center',
    top: 60,
  },
  thumbmnail: {
    height: 220,
  },
}));
