import React from 'react';
import { View } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { ProfileInfo } from './profileInfo.component';
import { MessageCircleIconFill, PersonAddIconFill } from '@src/assets/icons';
import { Artist as ArtistModel } from '@src/core/model';
import { ContainerView, ImageOverlay, textStyle } from '@src/components/common';
import { imageProfile7Bg, ImageSource } from '@src/assets/images';

import * as Artist from '@favid-inc/core/lib/entities/artist';
import * as firebase from 'firebase';

interface ComponentProps {
  artist: ArtistModel;
  onFollowPress: () => void;
  onMessagePress: () => void;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
  onPostsPress: () => void;
  onFriendPress: (index: number) => void;
  onPhotoPress: (index: number) => void;
}

export type Profile7Props = ThemedComponentProps & ComponentProps;

class ArtistDetailsComponent extends React.Component<Profile7Props> {
  private backgroundImage: ImageSource = imageProfile7Bg;

  public async componentDidMount() {}

  private onFollowPress = () => {
    this.props.onFollowPress();
  };

  private onMessagePress = () => {
    this.props.onMessagePress();
  };

  private onFollowersPress = () => {
    this.props.onFollowersPress();
  };

  private onFollowingPress = () => {
    this.props.onFollowingPress();
  };

  private onPostsPress = () => {
    this.props.onPostsPress();
  };

  private onFriendPress = (index: number) => {
    this.props.onFriendPress(index);
  };

  private onPhotoPress = (index: number) => {
    this.props.onPhotoPress(index);
  };

  public render(): React.ReactNode {
    const { themedStyle, artist } = this.props;
    const artistImage = {
      uri: artist.photo,
      height: 100,
      width: 100,
    };
    return (
      <ContainerView style={themedStyle.container}>
        <ImageOverlay style={themedStyle.profileInfoContainer} source={this.backgroundImage.imageSource}>
          <ProfileInfo photo={artistImage} name={artist.artisticName} location={artist.location} />
          <View style={themedStyle.actionContainer}>
            <Button style={themedStyle.followButton} textStyle={textStyle.button} icon={PersonAddIconFill} onPress={this.onFollowPress}>
              {artist.artisticName}
            </Button>
            <Button style={themedStyle.messageButton} textStyle={textStyle.button} status='white' icon={MessageCircleIconFill} onPress={this.onMessagePress}>
              MESSAGE
            </Button>
          </View>
        </ImageOverlay>
        <View style={[themedStyle.profileSection, themedStyle.aboutSection]}>
          <Text style={themedStyle.profileSectionLabel} category='s1'>
            About
          </Text>
          <Text style={[themedStyle.profileSectionContent, themedStyle.profileAboutLabel]} appearance='hint'>
            {artist.about}
          </Text>
        </View>
      </ContainerView>
    );
  }
}

export const ArtistDetails = withStyles(ArtistDetailsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  profileInfoContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  profileSocials: {
    justifyContent: 'space-evenly',
    marginTop: 24,
    paddingVertical: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  profileSection: {
    marginTop: 32,
  },
  profileSectionContent: {
    marginTop: 8,
  },
  socialsLabel: {
    color: 'white',
  },
  followButton: {
    flex: 1,
    marginRight: 4,
  },
  messageButton: {
    flex: 1,
    marginLeft: 4,
  },
  profileSectionLabel: {
    marginHorizontal: 16,
    ...textStyle.subtitle,
  },
  aboutSection: {
    marginTop: 24,
  },
  profileAboutLabel: {
    marginHorizontal: 16,
    ...textStyle.paragraph,
  },
  shotsSection: {
    marginBottom: 32,
  },
  friendsList: {
    paddingHorizontal: 12,
  },
}));
