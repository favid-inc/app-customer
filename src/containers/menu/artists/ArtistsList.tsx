import React from 'react';
import { ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, ViewProps } from 'react-native';
import { withStyles, ThemeType, ThemedComponentProps, StyleType } from '@kitten/theme';
import { Artist } from '@src/core/model';
import { ArtistCard, ArtistCardProps } from '@src/components/artist/artistCard.component';
import { List, Text } from '@kitten/ui';
import { textStyle } from '@src/components/common';

interface ComponentProps {
  categoryOfArtists: [{ key: string; artists: [Artist] }];
  onDetails: (Artist) => void;
}

interface State {
  selectedExerciseIndex: number;
}

export type ArtistsListComponentProps = ThemedComponentProps & ComponentProps;

class ArtistListComponent extends React.Component<ArtistsListComponentProps, State> {
  public state: State = {
    selectedExerciseIndex: 0,
  };

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

    const marginStyle: StyleType =
      info.index === categoryOfArtists[0].artists[0].length - 1 ? null : themedStyle.pagerCardMargin;

    return (
      <ArtistCard
        index={info.index}
        style={[themedStyle.pagerCard, marginStyle]}
        artist={info.item}
        onDetails={this.props.onDetails}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;
    let categoryList: React.ReactNode = <Text>Loading...</Text>;
    if (this.props.categoryOfArtists) {
      categoryList = this.props.categoryOfArtists.map(artistsList => {
        return (
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
        );
      });
    }
    return <ScrollView contentContainerStyle={themedStyle.container}>{categoryList}</ScrollView>;
  }
}

export const ArtistList = withStyles(ArtistListComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pagerContainer: {
    marginVertical: 8,
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
}));
