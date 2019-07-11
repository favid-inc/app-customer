import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Artists } from './artists.component';
import { Artist } from '@src/core/model';
import { artists } from '@src/core/data/artists';

interface State {
  selectedLevelIndex: number;
  artists: Artist[];
}

export class ArtistsContainer extends React.Component<NavigationScreenProps, State> {

  public state: State = {
    selectedLevelIndex: 0,
    artists: artists,
  };


  private onTrainingDetails = (index: number): void => {

  };

  public render(): React.ReactNode {
    return (
      <Artists
        artists={this.state.artists}
        onTrainingDetails={this.onTrainingDetails}
      />
    );
  }
}



