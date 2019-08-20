import React, { Component } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { Artist, CategoryOfArtistModel } from '@src/core/model';

import { ArtistList } from './ArtistsList';

import { listArtistsGroupingByMainCategory } from './listArtistsGroupingByMainCategory';

interface State {
  categoryOfArtists: CategoryOfArtistModel[];
  loading: boolean;
  searchString: string;
  selectedLevelIndex: number;
}

type Props = NavigationScreenProps;

export class ArtistsContainer extends Component<Props, State> {
  public state: State = {
    categoryOfArtists: [],
    loading: false,
    searchString: '',
    selectedLevelIndex: 0,
  };

  private navigationKey: string = 'Artists';

  public componentDidMount() {
    this.handleRefresh();
  }

  public render() {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.handleRefresh} />}>
        <ArtistList
          onSearchStringChange={this.handleSearchStringChange}
          loading={this.state.loading}
          categoryOfArtists={this.filteredArtists()}
          onDetails={(artist) => this.onDetails(artist)}
        />
      </ScrollView>
    );
  }

  private onDetails = (artist: Artist) => {
    // this.props.onSetArtist(artist);
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Artista',
      params: {
        artist,
      },
    });
  };

  private filteredArtists() {
    const { searchString } = this.state;

    if (!searchString) {
      return this.state.categoryOfArtists;
    }

    const term = new RegExp(searchString.toUpperCase());

    const filtered = this.state.categoryOfArtists
      .map((category) => {
        const artists = category.artists.filter((artist) => term.test(artist.artisticName.toUpperCase()));

        return { ...category, artists };
      })
      .filter((category) => category.artists.length);

    return filtered;
  }

  private handleRefresh = async () => {
    this.setState({ loading: true });
    try {
      const data = await listArtistsGroupingByMainCategory();

      const categoryOfArtists = Object.entries(data).map(([key, artists]) => ({ key, artists }));

      this.setState({ categoryOfArtists });
    } finally {
      this.setState({ loading: false });
    }
  };

  private handleSearchStringChange = (searchString) => {
    this.setState({ searchString });
  };
}
