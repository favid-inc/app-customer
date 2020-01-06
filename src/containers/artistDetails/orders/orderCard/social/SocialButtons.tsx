import React from 'react';
import { Linking, Platform, Share, View } from 'react-native';
import { OrderStatus } from '@favid-inc/api';
import { SocialOrder } from '@favid-inc/api/lib/app-customer';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';

import { FlagIconFill, HeartIconFill, HeartIconOutline, ShareIconOutline } from '@src/assets/icons';

import { SocialButton } from './SocialButton';
import { likeOrder } from './likeOrder';
import { unlikeOrder } from './unlikeOrder';

interface ComponentProps {
  order: SocialOrder;
}

export type Props = ThemedComponentProps & ComponentProps;

interface State {
  order: SocialOrder;
  sending: boolean;
}

export class SocialButtonsComponent extends React.Component<Props, State> {
  public state: State = {
    order: {},
    sending: false,
  };

  public componentWillMount() {
    this.setState({ order: this.props.order });
  }

  public render() {
    const { themedStyle } = this.props;
    const { order } = this.state;

    return (
      <View style={themedStyle.container}>
        <SocialButton icon={FlagIconFill} status='warning' onPress={this.onReport}>
          reportar
        </SocialButton>

        {order.status === OrderStatus.FULFILLED && (
          <SocialButton icon={ShareIconOutline} status='info' onPress={this.onShare}>
            compartilhar
          </SocialButton>
        )}

        {order.status === OrderStatus.FULFILLED && (
          <SocialButton icon={order.like ? HeartIconFill : HeartIconOutline} status='danger' disabled={this.state.sending} onPress={this.onLike}>
            {`${order.likes} ${order.likes !== 1 ? 'curtidas' : 'curtida'}`}
          </SocialButton>
        )}
      </View>
    );
  }

  private onShare = async () => {
    const { order: { id, artistArtisticName } } = this.state;

    const title = `Favid - Video exclusivo: ${artistArtisticName}`;
    const url = `https://app.favid.com.br/orders/${id}`;
    const message = `${title}, ${url}`;

    Share.share(
      Platform.select({
        ios: { title, url },
        android: { title, message },
      }),
    );
  };

  private onLike = async () => {
    const order = this.state.order;

    this.setState({
      sending: true,
      order: { ...this.state.order, like: !order.like, likes: order.likes + (order.like ? -1 : +1) },
    });
    try {
      this.setState({
        order: order.like ? await unlikeOrder({ orderId: order.id }) : await likeOrder({ orderId: order.id }),
      });
    } catch (e) {
      this.setState({ order });
    } finally {
      this.setState({ sending: false });
    }
  };

  private onReport = () => {
    Linking.openURL('https://www.favid.com.br/suporte/');
  };
}

export const SocialButtons = withStyles<ComponentProps>(SocialButtonsComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
  },
  socialLabel: {
    textAlign: 'center',
  },
  socialButton: {
    marginHorizontal: 10,
  },
}));
