import { ArtistRate } from '@favid-inc/api';
import { Order } from '@favid-inc/api';
import { SocialArtist as Artist } from '@favid-inc/api/lib/app-customer';
import React from 'react';
import { Alert, RefreshControl } from 'react-native';
import { NavigationEventSubscription, NavigationScreenProps } from 'react-navigation';

import { ContainerView } from '@src/components/common';

import { ArtistDetails } from './ArtistDetails';
import { followArtist } from './followArtist';
import { listArtistOrders } from './listArtistOrders';
import { listArtistRates } from './listArtistRates';
import { Orders } from './orders/Orders';
import { unFollowArtist } from './unFollowArtist';

interface State {
  artist: Artist;
  artistRates: ArtistRate[];
  cameoOrdered: boolean;
  follow: boolean;
  loading: boolean;
  orders: Order[];
  sending: boolean;
}

type Props = NavigationScreenProps;

export class ArtistDetailsContainer extends React.Component<Props, State> {
  public state: State = {
    artist: {},
    artistRates: [],
    cameoOrdered: false,
    follow: false,
    loading: false,
    orders: [],
    sending: false,
  };

  private didFocusSubscription: NavigationEventSubscription;

  public componentWillUnmount() {
    if (this.didFocusSubscription) {
      this.didFocusSubscription.remove();
    }
  }

  public async componentDidMount() {
    const { navigation } = this.props;

    this.didFocusSubscription = navigation.addListener('didFocus', () => this.handleRefresh());

    const artist = navigation.getParam('artist');
    this.setState({ artist });

    this.handleRefresh();
  }

  public componentWillUpdate(nextProps, nextState) {
    const { navigation } = nextProps;
    const { artist } = nextState;
    if (navigation) {
      Object.assign(navigation.getParam('artist'), artist);
    }
  }

  public render() {
    return (
      <ContainerView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.handleRefresh} />}>
        <ArtistDetails
          loading={this.state.loading}
          artist={this.state.artist}
          artistRates={this.state.artistRates}
          cameoOrdered={this.state.cameoOrdered}
          follow={this.state.follow}
          onFollowersPress={this.onFollowersPress}
          onFollowingPress={this.onFollowingPress}
          onFollowPress={this.onFollowPress}
          onFriendPress={this.onFriendPress}
          onOrderPress={this.onOrderPress}
          onOrdersPress={this.onOrdersPress}
          onPhotoPress={this.onPhotoPress}
          onReview={this.onReview}
          sending={this.state.sending}
        />
        <Orders orders={this.state.orders} onDetails={this.onDetails} />
      </ContainerView>
    );
  }

  private handleRefresh = async () => {
    if (this.state.loading) {
      return;
    }

    this.setState({ loading: true });

    try {
      const artist = this.props.navigation.getParam('artist');
      const artistId = artist.id;

      const [orders, artistRates] = await Promise.all([listArtistOrders({ artistId }), listArtistRates({ artistId })]);
      const rates = artistRates.map((r) => r.value).reduce((acc, cur) => acc + cur, 0) / (artistRates.length || 1);

      this.setState({
        orders,
        artistRates,
        artist: {
          ...artist,
          rates,
        },
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  private onDetails = (order: Order) => {
    this.props.navigation.navigate('Detalhes do Pedido', {
      order,
    });
  };

  private onFollowPress = async () => {
    try {
      const { id: artistId, follower, followers } = this.state.artist;

      this.setState({
        sending: true,
        artist: {
          ...this.state.artist,
          follower: !follower,
          followers: followers + (follower ? -1 : +1),
        },
      });

      const artist = follower ? await unFollowArtist({ artistId }) : await followArtist({ artistId });
      this.setState({ artist });
    } catch (error) {
      Alert.alert('Ops!', 'Estamos tendo problemas, tente novamente mais tarde.');
    } finally {
      this.setState({ sending: false });
    }
  };

  private onOrderPress = () => {
    this.props.navigation.navigate({
      routeName: 'Pedido',
      params: {
        artist: this.state.artist,
      },
    });
  };

  private onReview = () => {
    this.props.navigation.navigate({
      routeName: 'Avaliar Artista',
      params: {
        artistId: this.state.artist.id,
      },
    });
  };

  private onFollowersPress = () => {};

  private onFollowingPress = () => {};

  private onOrdersPress = () => {};

  private onFriendPress = (index: number) => {};

  private onPhotoPress = (index: number) => {};
}
