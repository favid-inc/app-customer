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
  cameoOrdered: boolean;
  follow: boolean;
  loading: boolean;
  artist: Artist;
  artistRates: ArtistRate[];
  orders: Order[];
}

type Props = NavigationScreenProps;

export class ArtistDetailsContainer extends React.Component<Props, State> {
  public state: State = {
    artist: {},
    orders: [],
    artistRates: [],
    cameoOrdered: false,
    follow: false,
    loading: false,
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
          artistRates={this.state.artistRates}
          artist={this.state.artist}
          cameoOrdered={this.state.cameoOrdered}
          follow={this.state.follow}
          onFollowersPress={this.onFollowersPress}
          onFollowingPress={this.onFollowingPress}
          onFollowPress={this.onFollowPress}
          onFriendPress={this.onFriendPress}
          onOrderPress={this.onOrderPress}
          onPhotoPress={this.onPhotoPress}
          onOrdersPress={this.onOrdersPress}
          onReview={this.onReview}
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
      const { id: artistId } = this.props.navigation.getParam('artist');

      const [orders, artistRates] = await Promise.all([listArtistOrders({ artistId }), listArtistRates({ artistId })]);

      this.setState({ orders, artistRates });
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
