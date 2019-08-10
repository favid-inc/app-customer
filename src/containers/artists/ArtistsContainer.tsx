import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ScrollView, RefreshControl } from 'react-native';

import * as actions from '@src/store/actions';
import { Artist, CategoryOfArtistModel } from '@src/core/model';

import { ArtistList } from './ArtistsList';

interface State {
  selectedLevelIndex: number;
  searchString: string;
}
interface ArtistContainerProps {
  loading: boolean;
  onListArtists: () => void;
  categoryOfArtists: CategoryOfArtistModel[];
  onSetArtist: (Artist) => void;
}

type Props = NavigationScreenProps & ArtistContainerProps;
class ArtistsContainerComponent extends Component<Props, State> {
  public state: State = {
    selectedLevelIndex: 0,
    searchString: '',
  };

  private navigationKey: string = 'Artists';

  public componentWillMount() {
    this.onRefresh();
  }

  private onRefresh = () => this.props.onListArtists();

  public onDetails(artist: Artist) {
    this.props.onSetArtist(artist);
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Artista',
    });
  }

  private onSearchStringChange = (searchString: string): void => {
    this.setState({ searchString });
  };

  public filteredArtists(): CategoryOfArtistModel[] {
    const { searchString } = this.state;

    if (!searchString) {
      return this.props.categoryOfArtists;
    }
    const categoryOfArtists: CategoryOfArtistModel[] = [...this.props.categoryOfArtists];
    const filtered: CategoryOfArtistModel[] = categoryOfArtists
      .map(
        (category): CategoryOfArtistModel => {
          const artists: Artist[] = category.artists.filter((artist: Artist) => {
            const term = new RegExp(searchString.toUpperCase());
            return term.test(artist.artisticName.toUpperCase());
          });
          return {
            ...category,
            artists,
          };
        },
      )
      .filter(category => category.artists.length);
    return filtered;
  }

  public render(): React.ReactNode {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.onRefresh} />}>
        <ArtistList
          onSearchStringChange={this.onSearchStringChange}
          loading={this.props.loading}
          categoryOfArtists={this.filteredArtists()}
          onDetails={artist => this.onDetails(artist)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    categoryOfArtists: state.artist.categoryOfArtists,
  };
};

const mapDispatchToProps = dispatch => ({
  onListArtists: () => dispatch(actions.listArtists()),
  onSetArtist: (artist: Artist) => dispatch(actions.setArtist(artist)),
});

export const ArtistsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistsContainerComponent);
