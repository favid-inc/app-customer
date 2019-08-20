import { StyleType, ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Input, InputProps, List, Text } from '@kitten/ui';
import { SearchIconOutline } from '@src/assets/icons';
import { ArtistCard, ArtistCardProps } from '@src/components/artist/artistCard.component';
import { textStyle } from '@src/components/common';
import { Artist, CategoryOfArtistModel } from '@src/core/model';
import React from 'react';
import {
  ActivityIndicator,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

interface ComponentProps {
  categoryOfArtists: CategoryOfArtistModel[];
  loading: boolean;
  onDetails: (Artist) => void;
  onSearchStringChange: (text: string) => void;
}

interface State {
  selectedExerciseIndex: number;
}

export type ArtistsListComponentProps = ThemedComponentProps & ComponentProps;

class ArtistListComponent extends React.Component<ArtistsListComponentProps, State> {
  public state: State = {
    selectedExerciseIndex: 0,
  };

  public render() {
    const { themedStyle, categoryOfArtists, loading } = this.props;

    if (loading) {
      return (
        <View style={themedStyle.container}>
          {this.renderSearchInput()}
          <ActivityIndicator size='large' />
        </View>
      );
    }

    if (!categoryOfArtists || !categoryOfArtists.length) {
      return (
        <View style={themedStyle.container}>
          {this.renderSearchInput()}
          <Text style={themedStyle.subtitle} appearance='hint'>
            Nenhum artista encontrado.
          </Text>
        </View>
      );
    }

    return (
      <View style={themedStyle.container}>
        {this.renderSearchInput()}
        <ScrollView contentContainerStyle={themedStyle.container}>
          {categoryOfArtists.map((artistsList) => (
            <View key={artistsList.key}>
              <Text style={themedStyle.pagerLabel} appearance='hint'>
                {artistsList.key}
              </Text>
              <List
                style={themedStyle.pagerContainer}
                horizontal={true}
                renderItem={this.renderPagerCard}
                data={artistsList.artists}
                showsHorizontalScrollIndicator={false}
                onScroll={this.onExerciseListScroll}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  private onExerciseListScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { themedStyle } = this.props;

    const { x: xOffset } = event.nativeEvent.contentOffset;
    const { width: itemWidth } = themedStyle.pagerCard;

    const selectedExerciseIndex: number = Math.round(xOffset / itemWidth);

    if (selectedExerciseIndex !== this.state.selectedExerciseIndex) {
      this.setState({ selectedExerciseIndex });
    }
  };

  private renderPagerCard = (info: ListRenderItemInfo<Artist>): React.ReactElement<ArtistCardProps> => {
    const { themedStyle, categoryOfArtists } = this.props;

    const marginStyle: StyleType = themedStyle.pagerCardMargin;
    // const marginStyle: StyleType =info.index === categoryOfArtists[0].artists.length - 1 ? null : themedStyle.pagerCardMargin;

    return (
      <ArtistCard
        index={info.index}
        style={[themedStyle.pagerCard, marginStyle]}
        artist={info.item}
        onDetails={this.props.onDetails}
      />
    );
  };

  private onSearchStringChange = (text: string): void => {
    this.props.onSearchStringChange(text);
  };

  private renderSearchInput = (): React.ReactElement<InputProps> | null => {
    const { themedStyle } = this.props;

    return (
      <Input
        style={themedStyle.input}
        textStyle={textStyle.paragraph}
        icon={SearchIconOutline}
        placeholder='Busque um artista...'
        onChangeText={this.onSearchStringChange}
      />
    );
  };
}

export const ArtistList = withStyles(ArtistListComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pagerContainer: {
    marginVertical: 8,
  },
  subtitle: {
    marginVertical: 16,
    textAlign: 'center',
    ...textStyle.subtitle,
  },
  pagerLabel: {
    marginVertical: 16,
    ...textStyle.paragraph,
  },
  pagerCard: {
    width: 226,
  },
  listCard: {
    marginVertical: 8,
  },
  pagerCardMargin: {
    marginRight: 16,
  },
  pagerIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  pagerIndicatorSelected: {
    backgroundColor: theme['background-basic-color-4'],
  },
  indicatorMarginRight: {
    marginRight: 12,
  },
  input: {
    marginHorizontal: 10,
  },
}));
