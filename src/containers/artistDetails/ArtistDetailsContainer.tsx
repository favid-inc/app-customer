import { SocialArtist as Artist } from '@favid-inc/api/lib/app-customer';
import { followArtist } from './FollowArtist';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { ArtistDetails } from './ArtistDetails';
import { Alert, View } from 'react-native';
import { ArtistRate } from '@src/core/model';
import { Order } from '@favid-inc/api';
import { Orders } from './orders/Orders';
import { listOrders } from './orders/listOrders';
import { ContainerView } from '@src/components/common';

interface State {
  cameoOrdered: boolean;
  follow: boolean;
  loading: boolean;
  artist: Artist;
  artistRates: ArtistRate[];
  orders: Order[];
}

type Props = NavigationScreenProps;

export class ArtistDetailsContainer extends Component<Props, State> {
  public state: State = {
    artist: {},
    orders: [],
    artistRates: [],
    cameoOrdered: false,
    follow: false,
    loading: false,
  };

  private navigationKey: string = 'Artists';

  public componentDidMount() {
    const { navigation } = this.props;
    const artist = navigation.getParam('artist');
    this.setState({ artist });
    const artistRates: ArtistRate[] = [];
    for (let index = 0; index < 50; index++) {
      artistRates.push({
        customerName: 'Gabriel Umbelino',
        message: 'Pudding pie macaroon sesame snaps chupa chups icing cupcake. Tiramisu sweet roll toffee gummi bears.',
        rate: 4,
      });
    }
    this.setState({
      artistRates,
    });
    this.handleRefresh();
  }

  public render() {
    return (
      <ContainerView>
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
          onPostsPress={this.onPostsPress}
          onReview={this.onReview}
        />
        <Orders orders={this.state.orders} onDetails={this.onDetails} />
      </ContainerView>
    );
  }

  private handleRefresh = async () => {
    this.setState({ loading: true });
    try {
      const orders = await listOrders(this.state.artist.id);
      console.log('[OrdersContainer.tsx] orders:', orders);
      this.setState({ orders });
    } catch (e) {
      Alert.alert('Erro ao listar pedidos');
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
      await followArtist({ artistId: this.state.artist.id });
      this.setState({
        artist: {
          ...this.state.artist,
          follower: !this.state.artist.follower,
        },
      });
    } catch (error) {
      // console.log(error);
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
    console.log('on review!');
    this.props.navigation.navigate({
      routeName: 'Avaliar Artista',
      params: {
        id: this.state.artist.id,
      },
    });
  };

  private onFollowersPress = () => {};

  private onFollowingPress = () => {};

  private onPostsPress = () => {};

  private onFriendPress = (index: number) => {};

  private onPhotoPress = (index: number) => {};
}
