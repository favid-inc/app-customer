import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import * as actions from '../../../store/actions';
import { Artist } from '@src/core/model/artist.model';
import { ArtistList } from './artistsList.component';
interface State {
  selectedLevelIndex: number;
}
interface ArtistContainerProps {
  onListArtists: () => void;
  categoryOfArtists: [{ key: string; artists: [Artist] }];
  onSetArtist: (Artist) => void;
}

type Props = NavigationScreenProps & ArtistContainerProps;
class ArtistsContainer extends Component<Props, State> {
  public state: State = {
    selectedLevelIndex: 0,
  };

  private navigationKey: string = 'Artists';

  public componentWillMount() {
    this.props.onListArtists();
  }

  public onDetails(artist: Artist) {
    this.props.onSetArtist(artist);
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Artist Details',
    });
  }

  public render(): React.ReactNode {
    return <ArtistList categoryOfArtists={this.props.categoryOfArtists} onDetails={artist => this.onDetails(artist)} />;
  }
}

const mapStateToProps = state => {
  return {
    categoryOfArtists: state.artist.categoryOfArtists,
  };
};

const mapDispatchToProps = dispatch => ({
  onListArtists: () => dispatch(actions.listArtists()),
  onSetArtist: (artist: Artist) => dispatch(actions.setArtist(artist)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistsContainer);
