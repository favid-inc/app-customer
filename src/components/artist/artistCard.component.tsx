import { Artist } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Text } from '@kitten/ui';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { Chips, ImageOverlay, textStyle } from '@src/components/common';

interface ComponentProps {
  artist: Artist;
  index?: number;
  onDetails: (Artist) => void;
}

export type ArtistCardProps = ThemedComponentProps & ComponentProps & TouchableOpacityProps;

class ArtistCardComponent extends React.Component<ArtistCardProps> {
  public render() {
    const { themedStyle, artist, style } = this.props;
    const artistImage = {
      uri: artist.photoUri,
      height: 128,
      width: 128,
    };

    return (
      <TouchableOpacity activeOpacity={0.95} onPress={() => this.props.onDetails(artist)}>
        <ImageOverlay style={[themedStyle.container, style]} source={artistImage}>
          <View>
            <Text style={themedStyle.titleLabel} category='h5'>
              {artist.artisticName}
            </Text>
            <Text style={themedStyle.levelLabel} appearance='hint'>
              {artist.mainCategory}
            </Text>
          </View>
          <Chips style={themedStyle.chips}>
            <Text style={themedStyle.chipsText}>{`R$ ${artist.price}`}</Text>
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
    width: 110,
    // display: 'block',
    textAlign: 'center',
  },
  chipsText: {
    color: 'white',
    ...textStyle.subtitle,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
}));
