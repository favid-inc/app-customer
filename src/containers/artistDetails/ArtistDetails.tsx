import React from 'react';
import { View } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { ProfileInfo } from './profileInfo.component';
import { EvaCheckmarkOutline, PersonAddIconFill } from '@src/assets/icons';
import { Artist as ArtistModel, ProfileSocials as ProfileSocialsModel } from '@src/core/model';
import { ContainerView, ImageOverlay, textStyle, Chips } from '@src/components/common';
import { imageProfile7Bg, ImageSource } from '@src/assets/images';
import { ShowcaseSection } from '@src/components/common/showcaseSection.component';
import { ProfileSocials } from './profileSocials.component';
import * as Artist from '@favid-inc/core/lib/entities/artist';
import * as firebase from 'firebase';

interface ComponentProps {
  artist: ArtistModel;
  socials: ProfileSocialsModel;
  cameoOrdered: boolean;
  follow: boolean;
  onFollowPress: () => void;
  onOrderPress: () => void;
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

  private onOrderPress = () => {
    this.props.onOrderPress();
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

    const socials: ProfileSocialsModel = {
      followers: 1500,
      following: 86,
      posts: 116,
    };
    const categories = artist.categories.map((cat, i) => {
      return (
        <Chips style={themedStyle.chips} key={`${cat}-${i}`}>
          <Text style={themedStyle.chipsText}>{cat}</Text>
        </Chips>
      );
    });
    const followStatus = this.props.follow ? 'white' : 'info';
    const cameoOrderedStatus = this.props.cameoOrdered ? 'white' : 'success';
    return (
      <ContainerView style={themedStyle.container}>
        <ImageOverlay style={themedStyle.profileInfoContainer} source={this.backgroundImage.imageSource}>
          <ProfileInfo photo={artistImage} name={artist.artisticName} mainCategory={artist.mainCategory} location={artist.location} />
          <View style={themedStyle.actionContainer}>
            <Button style={themedStyle.followButton} textStyle={textStyle.button} status={followStatus} icon={PersonAddIconFill} onPress={this.onFollowPress}>
              {this.props.follow ? 'Following' : 'Follow'}
            </Button>
            <Button style={themedStyle.orderButton} textStyle={textStyle.button} status={cameoOrderedStatus} icon={EvaCheckmarkOutline} onPress={this.onOrderPress}>
              {this.props.cameoOrdered ? 'Ordered' : 'Order'}
            </Button>
          </View>
          <ProfileSocials style={themedStyle.profileSocials} textStyle={themedStyle.socialsLabel} followers={socials.followers} following={socials.following} posts={socials.posts} onFollowersPress={this.onFollowersPress} onFollowingPress={this.onFollowingPress} onPostsPress={this.onPostsPress} />
        </ImageOverlay>
        <View style={[themedStyle.profileSection, themedStyle.aboutSection]}>
          <ShowcaseSection title='Categories' style={themedStyle.section}>
            <View style={themedStyle.categories}>{categories}</View>
          </ShowcaseSection>
          <ShowcaseSection title='About' style={themedStyle.section}>
            <Text style={[themedStyle.profileSectionContent, themedStyle.profileAboutLabel]} appearance='hint'>
              {artist.about}
            </Text>
          </ShowcaseSection>
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
  orderButton: {
    flex: 1,
    marginLeft: 15,
  },
  profileSectionLabel: {
    marginHorizontal: 16,
    ...textStyle.subtitle,
  },
  aboutSection: {
    marginHorizontal: 20,
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
  chipsText: {
    color: 'white',
    ...textStyle.subtitle,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginBottom: 3,
  },
  section: {
    paddingBottom: 30,
  },
}));
