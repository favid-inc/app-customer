import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import * as actions from '../../../store/actions';

import { Artists } from './artists.component';
import { Artist } from '@src/core/model/artist.model';
import { artists } from '@src/core/data/artists';
import { Text } from 'react-native';
// import database from '@favid-inc/core';

// console.log(database);

interface State {
  selectedLevelIndex: number;
}
interface ArtistContainerProps {
  onListArtists: () => void;
  categoryOfArtists: [{ key: string; artists: [Artist] }];
}

type Props = NavigationScreenProps & ArtistContainerProps;
class ArtistsContainer extends Component<Props, State> {
  public state: State = {
    selectedLevelIndex: 0,
  };
  private navigationKey: string = 'SocialContainer';

  componentWillMount() {
    this.props.onListArtists();
  }

  public render(): React.ReactNode {
    return <Artists categoryOfArtists={this.props.categoryOfArtists} />;
  }
}

const mapStateToProps = state => {
  return {
    categoryOfArtists: state.artist.categoryOfArtists,
  };
};

const mapDispatchToProps = dispatch => ({
  onListArtists: () => dispatch(actions.listArtists()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistsContainer);
