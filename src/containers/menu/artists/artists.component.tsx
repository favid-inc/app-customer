import React from 'react';
import { withStyles, ThemeType, ThemedComponentProps } from '@kitten/theme';
import { Easy1 } from './artistsList.component';
import { Artist } from '@src/core/model';

interface ComponentProps {
	artists: Artist[];
	onTrainingDetails: (index: number) => void;
}

export type ArtistsComponentProps = ThemedComponentProps & ComponentProps;

class ArtistsComponent extends React.Component<ArtistsComponentProps> {
	private onTrainingDetails = (index: number): void => {
		// tslint:disable-next-line:no-console
		console.log('[artist.component.tsx] onTraningDetails() =>  index: ' + index);
	};

	public render(): React.ReactNode {
		const { artists } = this.props;
		// console.log(JSON.stringify(artists));
		return <Easy1 artists={artists} onTrainingDetails={this.onTrainingDetails} />;
	}
}

export const Artists = withStyles(ArtistsComponent, (theme: ThemeType) => ({
	container: {
		flex: 1,
		backgroundColor: theme['background-basic-color-2'],
	},
}));
