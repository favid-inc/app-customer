import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Text } from '@kitten/ui';
import { Chips, ImageOverlay, textStyle } from '@src/components/common';
import { CartIconFill } from '@src/assets/icons';
import { Artist } from '@src/core/model';

interface ComponentProps {
	artist: Artist;
	index?: number;
	onDetails: (artistId: string) => void;
}

export type ArtistCardProps = ThemedComponentProps & ComponentProps & TouchableOpacityProps;

class ArtistCardComponent extends React.Component<ArtistCardProps> {
	public render(): React.ReactNode {
		const { themedStyle, artist, style } = this.props;

		return (
			<TouchableOpacity activeOpacity={0.95} onPress={() => this.props.onDetails(artist.id)}>
				<ImageOverlay style={[ themedStyle.container, style ]} source={artist.photo.imageSource}>
					<View>
						<Text style={themedStyle.levelLabel} appearance="hint">
							{artist.type}
						</Text>
						<Text style={themedStyle.titleLabel} category="h5">
							{artist.firstName}
						</Text>
					</View>
					<Chips style={themedStyle.chips}>
						<Text style={themedStyle.chipsText} appearance="hint">
							{`R$ ${artist.price}`}
						</Text>
					</Chips>
				</ImageOverlay>
			</TouchableOpacity>
		);
	}
}

export const ArtistCard = withStyles(ArtistCardComponent, (theme: ThemeType) => ({
	container: {
		height: 200,
		padding: 16,
		borderRadius: 12,
		justifyContent: 'space-between',
		overflow: 'hidden',
	},
	levelLabel: {
		color: 'white',
		...textStyle.subtitle,
	},
	titleLabel: {
		color: 'white',
		...textStyle.headline,
	},
	chips: {
		width: 80,
	},
	chipsText: {
		color: 'white',
		...textStyle.subtitle,
	},
}));
