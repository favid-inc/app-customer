import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Text } from '@kitten/ui';
import { Chips, ImageOverlay, textStyle } from '@src/components/common';
import { CartIconFill } from '@src/assets/icons';
import { Artist } from '@src/core/model';
import { ImageSource } from '@src/assets/images';
import { NavigationScreenProps } from 'react-navigation';
import * as actions from '../../store/actions';
interface ComponentProps {
  artist: Artist;
  index?: number;
  onDetails: (Artist) => void;
}

export type ArtistCardProps = NavigationScreenProps & ThemedComponentProps & ComponentProps & TouchableOpacityProps;

class ArtistCardComponent extends React.Component<ArtistCardProps> {
  public render(): React.ReactNode {
    const { themedStyle, artist, style } = this.props;
    const artistImage = {
      uri: artist.photo,
      height: 100,
      width: 100,
    };

    return (
      <TouchableOpacity activeOpacity={0.95} onPress={() => this.props.onDetails(artist)}>
        <ImageOverlay style={[themedStyle.container, style]} source={artistImage}>
          <View>
            <Text style={themedStyle.levelLabel} appearance='hint'>
              {artist.mainCategory}
            </Text>
            <Text style={themedStyle.titleLabel} category='h5'>
              {artist.artisticName}
            </Text>
          </View>
          <Chips style={themedStyle.chips}>
            <Text style={themedStyle.chipsText} appearance='hint'>
              {`R$ ${artist.price}`}
            </Text>
          </Chips>
        </ImageOverlay>
      </TouchableOpacity>
    );
  }
}

export const ArtistCard = withStyles(ArtistCardComponent, (theme: ThemeType) => ({
  container: {
    height: 200,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  levelLabel: {
    color: 'white',
    ...textStyle.subtitle,
  },
  titleLabel: {
    color: 'white',
    ...textStyle.headline,
  },
  chips: {
    width: 80,
  },
  chipsText: {
    color: 'white',
    ...textStyle.subtitle,
  },
}));
