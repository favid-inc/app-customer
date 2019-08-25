import React from 'react';
import { Button, Text } from '@kitten/ui';
import { ArtistRate } from '@favid-inc/api';
import { ProfileInfo } from './profileInfo.component';
import { View, ActivityIndicator } from 'react-native';
import { ProfileSocials } from './profileSocials.component';
import { imageProfile7Bg, ImageSource } from '@src/assets/images';
import { SocialArtist as Artist } from '@favid-inc/api/lib/app-customer';
import { ArtistReviewsResume } from '../artists/review/ArtistReviewsResume';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Chips, ContainerView, ImageOverlay, textStyle, RateBar } from '@src/components/common';
import { ShowcaseSection } from '@src/components/common/showcaseSection.component';
import { VideoPlayer } from '../orders/orderDetails/videoPlayer';

interface ComponentProps {
  artist: Artist;
  artistRates: ArtistRate[];
  cameoOrdered: boolean;
  follow: boolean;
  onFollowPress: () => void;
  onOrderPress: () => void;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
  onOrdersPress: () => void;
  onFriendPress: (index: number) => void;
  onPhotoPress: (index: number) => void;
  onReview: () => void;
  sending: boolean;
  loading: boolean;
}

export type Props = ThemedComponentProps & ComponentProps;

interface State {
  rateAvarage: number;
  showRates: number;
}

class ArtistDetailsComponent extends React.Component<Props, State> {
  public state: State = {
    rateAvarage: 0,
    showRates: 5,
  };

  private backgroundImage: ImageSource = imageProfile7Bg;

  public async componentDidMount() {}

  public render() {
    const { themedStyle, artist, artistRates, loading } = this.props;
    const artistImage = {
      uri: artist.photoUri,
      height: 100,
      width: 100,
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

    console.log('[ArtistDetails.tsx] artist.videoUri', artist.videoUri);

    return (
      <ContainerView style={themedStyle.container}>
        <ImageOverlay style={themedStyle.profileInfoContainer} source={this.backgroundImage.imageSource}>
          <ProfileInfo
            location={artist.location}
            mainCategory={artist.mainCategory}
            name={artist.artisticName}
            photo={artistImage}
          />
          <View style={themedStyle.actionContainer}>
            <View style={themedStyle.price}>
              <Text category='h6' style={themedStyle.priceText}>{`R$ ${artist.price}`}</Text>
            </View>
            <Button
              appearance={artist.follower ? 'outline' : 'filled'}
              disabled={this.props.sending}
              onPress={this.onFollowPress}
              size='large'
              style={themedStyle.orderButton}
            >
              {artist.follower ? 'Seguindo' : 'Seguir'}
            </Button>
          </View>

          <ProfileSocials
            artist={artist}
            onFollowersPress={this.onFollowersPress}
            onFollowingPress={this.onFollowingPress}
            onOrdersPress={this.onOrdersPress}
            style={themedStyle.profileSocials}
            textStyle={themedStyle.socialsLabel}
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
        <View style={[themedStyle.profileSection, themedStyle.aboutSection]}>
          {categories}
          {biography}
        </View>
        {!artist.videoUri ? (
          <View style={{flex: 1, position: 'relative', height: 550}}>
            <VideoPlayer uri={artist.videoUri} />
          </View>
        ) : null}
        <ArtistRates
          loading={loading}
          artist={artist}
          showRates={this.state.showRates}
          onReview={this.onReview}
          artistRates={artistRates}
          showMore={this.showMore}
          showLess={this.showLess}
        ></ArtistRates>
      </ContainerView>
    );
  }

  public showMore = () => this.setState({ showRates: this.state.showRates + 5 });

  public showLess = () => this.setState({ showRates: 5 });

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

  private onOrdersPress = () => {
    this.props.onOrdersPress();
  };
}

const ArtistRates = (props) => {
  const showMore =
    props.showRates > props.artistRates.length ? (
      <Button onPress={props.showLess} size='large' appearance='ghost'>
        Mostrar Menos
      </Button>
    ) : (
      <Button onPress={props.showMore} size='large' appearance='ghost'>
        Mostrar Mais
      </Button>
    );

  let reviewList = null;
  if (props.loading) {
    reviewList = <ActivityIndicator size='large' />;
  } else if (props.artistRates.length) {
    reviewList = (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text category='h5' style={{ fontFamily: 'opensans-bold' }}>{`${props.artistRates.length} Avaliações`}</Text>
          <Button onPress={props.onReview} size='giant' appearance='ghost'>
            Avaliar
          </Button>
        </View>
        {props.artistRates.slice(0, props.showRates).map((rate, i) => (
          <ArtistReviewsResume key={i} {...rate} />
        ))}
        {showMore}
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 30, backgroundColor: '#f9f9f9' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RateBar
          max={5}
          value={Math.round(props.artist.rates || 0)}
          iconStyle={{ width: 30, height: 30 }}
          iconDisabledStyle={{ tintColor: '#dedede', width: 25, height: 25 }}
        />
        <Text appearance='hint' numberOfLines={1}>
          {`${Math.round(props.artist.rates || 0)} Estrelas`}
        </Text>
      </View>
      {reviewList}
    </View>
  );
};

export const ArtistDetails = withStyles<ComponentProps>(ArtistDetailsComponent, (theme: ThemeType) => ({
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
    fontFamily: 'opensans-bold',
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
    fontSize: 10,
    textAlign: 'center',
  },
  chips: {
    marginHorizontal: 4,
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  section: {
    paddingBottom: 30,
  },
}));
