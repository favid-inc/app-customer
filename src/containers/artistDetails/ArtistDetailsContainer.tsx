import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Artist, ProfileSocials, ProfileActivity } from '@src/core/model';
import { ArtistDetails } from './ArtistDetails.component';
import { NavigationScreenProps } from 'react-navigation';
import { profileActivity1, profileSocials1 } from '@src/core/data/profile';
interface State {
  socials: ProfileSocials;
  activity: ProfileActivity[];
}

interface ArtistContainerProps {
  artist: Artist;
}

type props = NavigationScreenProps & ArtistContainerProps;

class ArtistContainer extends Component<props, State> {
  public state: State = {
    socials: profileSocials1,
    activity: profileActivity1,
  };
  private onFollowPress = () => {};

  private onMessagePress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
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
        socials={this.state.socials}
        activities={this.state.activity}
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
