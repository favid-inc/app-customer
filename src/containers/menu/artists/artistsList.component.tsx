import React from 'react';
import { ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, ViewProps } from 'react-native';
import { withStyles, ThemeType, ThemedComponentProps, StyleType } from '@kitten/theme';
import { Artist } from '@src/core/model';
import { ArtistCard, ArtistCardProps } from '@src/components/artist/artistCard.component';
import { List, Text } from '@kitten/ui';
import { textStyle } from '@src/components/common';
import { ArtistsByMainCategorySearch } from '@favid-inc/api';
import { artist1, artists } from '@src/core/data/artists';

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

  private renderPagerIndicator = (index: number): React.ReactElement<ViewProps> => {
    const { themedStyle, categoryOfArtists } = this.props;
    const additionalStyle: StyleType = index === this.state.selectedExerciseIndex ? themedStyle.pagerIndicatorSelected : null;
    const marginStyle: StyleType = index === artists.length - 1 ? null : themedStyle.indicatorMarginRight;

    return <View style={[themedStyle.pagerIndicator, additionalStyle, marginStyle]} key={index} />;
  };

  private renderPagerCard = (info: ListRenderItemInfo<Artist>): React.ReactElement<ArtistCardProps> => {
    const { themedStyle, categoryOfArtists } = this.props;

    const marginStyle: StyleType = info.index === categoryOfArtists[0].length - 1 ? null : themedStyle.pagerCardMargin;

    return <ArtistCard index={info.index} style={[themedStyle.pagerCard, marginStyle]} artist={info.item} onDetails={this.props.onDetails} />;
  };

  private renderPager = (artistList: Artist[]): React.ReactElement<ViewProps> => {
    const { themedStyle } = this.props;

    return (
      <View>
        <List style={themedStyle.pagerContainer} horizontal={true} renderItem={this.renderPagerCard} data={artistList} showsHorizontalScrollIndicator={false} onScroll={this.onExerciseListScroll} />
      </View>
    );
  };

  private renderListCard = (info: ListRenderItemInfo<Artist>): React.ReactElement<ArtistCardProps> => {
    return <ArtistCard style={this.props.themedStyle.listCard} artist={info.item} index={info.index} onDetails={this.props.onDetails} />;
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;
    let categoryList = <Text>Loading...</Text>;
    if (this.props.categoryOfArtists) {
      categoryList = this.props.categoryOfArtists.map(artistsList => {
        return (
          <View>
            <Text style={themedStyle.pagerLabel} appearance='hint'>
              {artistsList.key}
            </Text>
            {this.renderPager(artistsList.artists)}
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
  pagerIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme['background-basic-color-3'],
  },
  pagerIndicatorSelected: {
    backgroundColor: theme['background-basic-color-4'],
  },
  indicatorMarginRight: {
    marginRight: 12,
  },
}));
