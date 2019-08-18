import { Artist } from '@src/core/model';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { ArtistDetails } from './ArtistDetails';

interface ArtistContainerProps {
  artist: Artist;
}

interface State {
  cameoOrdered: boolean;
  follow: boolean;
}

type Props = NavigationScreenProps & ArtistContainerProps;

class ArtistContainer extends Component<Props, State> {
  public state: State = {
    cameoOrdered: false,
    follow: false,
  };

  public render(): React.ReactNode {
    return (
      <ArtistDetails
        follow={this.state.follow}
        cameoOrdered={this.state.cameoOrdered}
        artist={this.props.artist}
        onFollowPress={this.onFollowPress}
        onOrderPress={this.onOrderPress}
        onFollowersPress={this.onFollowersPress}
        onFollowingPress={this.onFollowingPress}
        onPostsPress={this.onPostsPress}
        onFriendPress={this.onFriendPress}
        onPhotoPress={this.onPhotoPress}
      />
    );
  }

  private onFollowPress = () => {
    this.setState({ follow: true });
  };

  private onOrderPress = () => {
    this.props.navigation.navigate({
      routeName: 'Pedido',
    });
  };
  private onFollowersPress = () => {};

  private onFollowingPress = () => {};

  private onPostsPress = () => {};

  private onFriendPress = (index: number) => {};

  private onPhotoPress = (index: number) => {};
}

const mapStateToProps = ({ artist }) => {
  return {
    artist: artist.artist,
  };
};

export default connect(mapStateToProps)(ArtistContainer);
