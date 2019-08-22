import { Artist } from '@favid-inc/api';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { ArtistDetails } from './ArtistDetails';

interface State {
  cameoOrdered: boolean;
  follow: boolean;
  artist: Artist;
}

type Props = NavigationScreenProps;

export class ArtistDetailsContainer extends Component<Props, State> {
  public state: State = {
    artist: {},
    cameoOrdered: false,
    follow: false,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    const artist = navigation.getParam('artist');
    this.setState({ artist });
  }

  public render() {
    return (
      <ArtistDetails
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
      />
    );
  }

  private onFollowPress = () => {
    this.setState({ follow: !this.state.follow });
  };

  private onOrderPress = () => {
    this.props.navigation.navigate({
      routeName: 'Pedido',
      params: {
        artist: this.state.artist,
      },
    });
  };

  private onFollowersPress = () => {};

  private onFollowingPress = () => {};

  private onPostsPress = () => {};

  private onFriendPress = (index: number) => {};

  private onPhotoPress = (index: number) => {};
}
