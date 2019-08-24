import { SocialArtist as Artist } from '@favid-inc/api/lib/app-customer';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { imageProfile7Bg, ImageSource } from '@src/assets/images';
import { Chips, ContainerView, ImageOverlay, textStyle } from '@src/components/common';
import { ShowcaseSection } from '@src/components/common/showcaseSection.component';
import { ProfileSocials as ProfileSocialsModel, ArtistRate } from '@src/core/model';
import React from 'react';
import { View } from 'react-native';
import { ArtistReviewsResume } from '../artists/review/ArtistReviewsResume';
import { ProfileInfo } from './profileInfo.component';
import { ProfileSocials } from './profileSocials.component';

interface ComponentProps {
  artist: Artist;
  artistRates: ArtistRate[];
  cameoOrdered: boolean;
  follow: boolean;
  onFollowPress: () => void;
  onOrderPress: () => void;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
  onPostsPress: () => void;
  onFriendPress: (index: number) => void;
  onPhotoPress: (index: number) => void;
  onReview: () => void;
}

export type Profile7Props = ThemedComponentProps & ComponentProps;

interface State {
  rateAvarage: number;
  showRates: number;
}

class ArtistDetailsComponent extends React.Component<Profile7Props, State> {
  public state: State = {
    rateAvarage: 0,
    showRates: 5,
  };

  private backgroundImage: ImageSource = imageProfile7Bg;

  public async componentDidMount() {}

  public render() {
    const { themedStyle, artist, artistRates } = this.props;
    const artistImage = {
      uri: artist.photoUri,
      height: 100,
      width: 100,
    };

    const socials: ProfileSocialsModel = {
      followers: 1500,
      following: 86,
      posts: 116,
    };

    let categories = null;
    if (artist.categories && artist.categories.length) {
      categories = (
        <ShowcaseSection title='Tags' style={themedStyle.section}>
          <View style={themedStyle.categories}>
            {artist.categories.map((cat, i) => {
              return (
                <Chips style={themedStyle.chips} key={`${cat}-${i}`}>
                  <Text style={themedStyle.chipsText}>{cat}</Text>
                </Chips>
              );
            })}
          </View>
        </ShowcaseSection>
      );
    }

    let biography = null;

    if (artist.biography && artist.biography.length) {
      biography = (
        <View style={themedStyle.section}>
          <Text style={[themedStyle.profileSectionContent, themedStyle.profileAboutLabel]}>{artist.biography}</Text>
        </View>
      );
    }

    return (
      <ContainerView style={themedStyle.container}>
        <ImageOverlay style={themedStyle.profileInfoContainer} source={this.backgroundImage.imageSource}>
          <ProfileInfo
            photo={artistImage}
            name={artist.artisticName}
            mainCategory={artist.mainCategory}
            location={artist.location}
          />
          <View style={themedStyle.actionContainer}>
            <View style={themedStyle.price}>
              <Text category='h6' style={themedStyle.priceText}>{`R$ ${artist.price}`}</Text>
            </View>
            <Button
              size='large'
              style={themedStyle.orderButton}
              appearance={artist.follower ? 'outline' : 'filled'}
              onPress={this.onFollowPress}
            >
              {artist.follower ? 'Seguindo' : 'Seguir'}
            </Button>
          </View>

          <ProfileSocials
            style={themedStyle.profileSocials}
            textStyle={themedStyle.socialsLabel}
            followers={artist.followers}
            following={artist.follower}
            posts={artist.orders}
            onFollowersPress={this.onFollowersPress}
            onFollowingPress={this.onFollowingPress}
            onPostsPress={this.onPostsPress}
          />
        </ImageOverlay>
        <Button
          size='giant'
          style={themedStyle.orderButton}
          status={this.props.cameoOrdered ? 'white' : 'success'}
          onPress={this.onOrderPress}
        >
          {this.props.cameoOrdered ? 'Pendente' : 'Pedir'}
        </Button>
        <ArtistRates
          showRates={this.state.showRates}
          onReview={this.onReview}
          artistRates={artistRates}
          showMore={this.showMore}
        ></ArtistRates>
        <View style={[themedStyle.profileSection, themedStyle.aboutSection]}>
          {categories}
          {biography}
        </View>
      </ContainerView>
    );
  }

  public showMore = () => this.setState({ showRates: this.state.showRates + 5 });

  private onReview = () => this.props.onReview();

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
}

const ArtistRates = (props) => {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 30, backgroundColor: '#f9f9f9' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text category='h5' style={{ fontFamily: 'opensans-bold' }}>{`${props.artistRates.length} Avaliações`}</Text>
        <Button onPress={props.onReview} size='giant' appearance='ghost'>
          Avaliar
        </Button>
      </View>
      {props.artistRates.slice(0, props.showRates).map((rate, i) => (
        <ArtistReviewsResume key={i} {...rate} />
      ))}
      <Button onPress={props.showMore} size='large' appearance='ghost'>
        Mostrar Mais
      </Button>
    </View>
  );
};

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
    paddingVertical: 15,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  orderButton: {
    flex: 1,
  },
  price: {
    flex: 1,
    color: 'white',
    ...textStyle.subtitle,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  priceText: {
    ...textStyle.subtitle,
    fontFamily: 'opensans-bold',
    color: 'white',
    textAlign: 'center',
  },
  priceDescription: {
    ...textStyle.paragraph,
    color: 'white',
    textAlign: 'center',
    lineHeight: 14,
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
    ...textStyle.paragraph,
  },
  shotsSection: {
    marginBottom: 22,
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
