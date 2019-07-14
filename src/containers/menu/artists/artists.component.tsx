import React from 'react';
import { withStyles, ThemeType, ThemedComponentProps } from '@kitten/theme';
import { ArtistList } from './artistsList.component';
import { Artist } from '@src/core/model';

interface ComponentProps {
  categoryOfArtists: [{ key: string; artists: [Artist] }];
  onDetails: (Artist) => void;
}

export type ArtistsComponentProps = ThemedComponentProps & ComponentProps;

class ArtistsComponent extends React.Component<ArtistsComponentProps> {
  public render(): React.ReactNode {
    return <ArtistList categoryOfArtists={this.props.categoryOfArtists} onDetails={this.props.onDetails} />;
  }
}

export const Artists = withStyles(ArtistsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
