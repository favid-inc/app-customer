import React from 'react';
import { withStyles, ThemeType, ThemedComponentProps } from '@kitten/theme';
import { Easy1 } from './artistsList.component';
import { Artist } from '@src/core/model';

interface ComponentProps {
	artists: Artist[];
	onTrainingDetails: (artistId: string) => void;
}

export type ArtistsComponentProps = ThemedComponentProps & ComponentProps;

class ArtistsComponent extends React.Component<ArtistsComponentProps> {
	public render(): React.ReactNode {
		const { artists } = this.props;
		// console.log(JSON.stringify(artists));
		return <Easy1 artists={artists} onTrainingDetails={this.props.onTrainingDetails} />;
	}
}

export const Artists = withStyles(ArtistsComponent, (theme: ThemeType) => ({
	container: {
		flex: 1,
		backgroundColor: theme['background-basic-color-2'],
	},
}));
