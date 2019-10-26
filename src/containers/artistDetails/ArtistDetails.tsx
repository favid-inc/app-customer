import { ArtistRate } from '@favid-inc/api';
import { SocialArtist as Artist } from '@favid-inc/api/lib/app-customer';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import React from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';

// import { imageProfile7Bg, ImageSource } from '@src/assets/images';
// import { Chips, ContainerView, ImageOverlay, RateBar, textStyle } from '@src/components/common';
import { Chips, ContainerView, RateBar, textStyle } from '@src/components/common';
import { ShowcaseSection } from '@src/components/common/showcaseSection.component';
// import { VideoPlayer } from '@src/components/videoPlayer';

import { ArtistReviewsResume } from '../artists/review/ArtistReviewsResume';
// import { ProfileInfo } from './profileInfo.component';
import { ProfileSocials } from './profileSocials.component';
import { Video } from 'expo-av';

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

const { height } = Dimensions.get('window');

class ArtistDetailsComponent extends React.Component<Props, State> {
  public state: State = {
    rateAvarage: 0,
    showRates: 5,
  };

  public render() {
    const { themedStyle, artist, artistRates, loading } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        {artist.videoUri && (
          <Video
            style={{ flex: 1, position: 'relative', height: height * 0.6 }}
            resizeMode={Video.RESIZE_MODE_COVER}
            shouldPlay={true}
            source={{ uri: artist.videoUri }}
            useNativeControls={true}
          />
        )}
        <View style={themedStyle.profileInfoContainer}>
          <View style={themedStyle.subtitle}>
            <Text category='h5' style={themedStyle.subtitleText}>
              {artist.artisticName}
            </Text>
            <Text category='h6' style={themedStyle.subtitleText}>
              {artist.mainCategory}
            </Text>
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
          <ProfileSocials
            artist={artist}
            onFollowersPress={this.onFollowersPress}
            onFollowingPress={this.onFollowingPress}
            onOrdersPress={this.onOrdersPress}
            style={themedStyle.profileSocials}
            textStyle={themedStyle.socialsLabel}
          />
        </View>

        <Button
          size='giant'
          style={themedStyle.orderButton}
          status={this.props.cameoOrdered ? 'white' : 'success'}
          onPress={this.onOrderPress}
        >
          {this.props.cameoOrdered ? 'Pendente' : `Pedir por R$ ${artist.price}`}
        </Button>

        <View style={[themedStyle.profileSection, themedStyle.aboutSection]}>
          {artist.categories && artist.categories.length && (
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
          )}
          {artist.biography && artist.biography.length && (
            <View style={themedStyle.section}>
              <Text style={[themedStyle.profileSectionContent, themedStyle.profileAboutLabel]}>{artist.biography}</Text>
            </View>
          )}
        </View>

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
    props.showRates >= props.artistRates.length ? null : (
      <Button onPress={props.showMore} size='large' appearance='ghost'>
        Mostrar Mais
      </Button>
    );

  const reviewList = props.loading ? (
    <ActivityIndicator size='large' />
  ) : (
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
    backgroundColor: theme['background-basic-color-2'],
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
    color: theme['color-primary-default'],
  },
  orderButton: {
    flex: 1,
    fontFamily: 'opensans-bold',
  },
  subtitle: {
    flex: 1,
    ...textStyle.subtitle,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  subtitleText: {
    ...textStyle.subtitle,
    fontFamily: 'opensans-bold',
    textAlign: 'left',
    color: theme['color-primary-default'],
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
