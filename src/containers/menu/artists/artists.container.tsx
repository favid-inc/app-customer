import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import * as actions from '../../../store/actions';

import { Artists } from './artists.component';
import { Artist } from '@src/core/model/artist.model';
import { artists } from '@src/core/data/artists';
// import database from '@favid-inc/core';

// console.log(database);

interface State {
  selectedLevelIndex: number;
  artists: Artist[];
}
interface ArtistContainerProps {
  onSetArtist: (artist: Artist) => void;
}

type props = NavigationScreenProps & ArtistContainerProps;
class ArtistsContainer extends Component<props, State> {
  public state: State = {
    selectedLevelIndex: 0,
    artists: artists,
  };
  private navigationKey: string = 'SocialContainer';

  private onTrainingDetails = (artistId: string): void => {
    const [artist] = this.state.artists.filter((a: Artist) => a.id === artistId);
    this.props.onSetArtist(artist);
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Artist Details',
    });
  };

  public render(): React.ReactNode {
    return <Artists artists={this.state.artists} onTrainingDetails={this.onTrainingDetails} />;
  }
}

const mapDispatchToProps = dispatch => ({
  onSetArtist: artist => dispatch(actions.setArtist(artist)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ArtistsContainer);
