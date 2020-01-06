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
  public componentDidMount() {
    this.setState({ order: this.props.order });
  }

  public render() {
    const { order, themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        {order.status === OrderStatus.FULFILLED && (
          <SocialButton icon={ShareIconOutline} onPress={this.onShare}>
            compartilhar
          </SocialButton>
        )}

        {order.status === OrderStatus.FULFILLED && (
          <SocialButton icon={order.like ? HeartIconFill : HeartIconOutline} onPress={this.onLike}>
            {order.likes ? `${order.likes} ${order.likes > 1 ? 'curtidas' : 'curtida'}` : ''}
          </SocialButton>
        )}

        <SocialButton icon={FlagIconFill} onPress={this.onReport}>
          reportar
        </SocialButton>
      </View>
    );
  }

  private onShare = async () => {
    const { order: { artistArtisticName, videoUri } } = this.props;

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
