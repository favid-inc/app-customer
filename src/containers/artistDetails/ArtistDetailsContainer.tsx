import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Artist } from '@src/core/model';
import { ArtistDetails } from './ArtistDetails.component';
import { NavigationScreenProps } from 'react-navigation';

interface ArtistContainerProps {
  artist: Artist;
}

type props = NavigationScreenProps & ArtistContainerProps;

class ArtistContainer extends Component<props> {
  private onFollowPress = () => {};

  private onMessagePress = () => {
    this.props.navigation.navigate({
      key: 'ArtistDetails',
      routeName: 'Chat 1',
    });
  };
  private onFollowersPress = () => {};

  private onFollowingPress = () => {};

  private onPostsPress = () => {};

  private onFriendPress = (index: number) => {};

  private onPhotoPress = (index: number) => {};

  public render(): React.ReactNode {
    return (
      <ArtistDetails
        artist={this.props.artist}
        onFollowPress={this.onFollowPress}
        onMessagePress={this.onMessagePress}
        onFollowersPress={this.onFollowersPress}
        onFollowingPress={this.onFollowingPress}
        onPostsPress={this.onPostsPress}
        onFriendPress={this.onFriendPress}
        onPhotoPress={this.onPhotoPress}
      />
    );
  }
}

const mapStateToProps = ({ artist }) => {
  return {
    artist: artist.artist,
  };
};

export default connect(mapStateToProps)(ArtistContainer);
