import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { ProfileActivityList3, ProfileFriendList, ProfileInfo3, ProfileSocials } from '@src/components/social';
import { MessageCircleIconFill, PersonAddIconFill } from '@src/assets/icons';
import { Artist as ArtistModel, ProfileSocials as ProfileSocialsModel, ProfileActivity as ProfileActivityModel } from '@src/core/model';
import { ContainerView, ImageOverlay, textStyle } from '@src/components/common';
import { imageProfile7Bg, ImageSource } from '@src/assets/images';

interface ComponentProps {
	artist: ArtistModel;
	socials: ProfileSocialsModel;
	activities: ProfileActivityModel[];
	onFollowPress: () => void;
	onMessagePress: () => void;
	onFollowersPress: () => void;
	onFollowingPress: () => void;
	onPostsPress: () => void;
	onFriendPress: (index: number) => void;
	onPhotoPress: (index: number) => void;
}

export type Profile7Props = ThemedComponentProps & ComponentProps;

class ArtistDetailsComponent extends React.Component<Profile7Props> {
	private backgroundImage: ImageSource = imageProfile7Bg;

	private onFollowPress = () => {
		this.props.onFollowPress();
	};

	private onMessagePress = () => {
		this.props.onMessagePress();
	};

	private onFollowersPress = () => {
		this.props.onFollowersPress();
	};

	private onFollowingPress = () => {
		this.props.onFollowingPress();
	};

	private onPostsPress = () => {
		this.props.onPostsPress();
	};

	private onFriendPress = (index: number) => {
		this.props.onFriendPress(index);
	};

	private onPhotoPress = (index: number) => {
		this.props.onPhotoPress(index);
	};

	private createActivitySource = (activity: ProfileActivityModel): ImageSourcePropType => {
		return activity.source.imageSource;
	};

	public render(): React.ReactNode {
		const { themedStyle, artist, socials, activities } = this.props;

		return (
			<ContainerView style={themedStyle.container}>
				<ImageOverlay style={themedStyle.profileInfoContainer} source={this.backgroundImage.imageSource}>
					<ProfileInfo3 photo={artist.photo.imageSource} name={`${artist.firstName} ${artist.lastName}`} location={artist.location} />
					<View style={themedStyle.actionContainer}>
						<Button style={themedStyle.followButton} textStyle={textStyle.button} icon={PersonAddIconFill} onPress={this.onFollowPress}>
							FOLLOW
						</Button>
						<Button style={themedStyle.messageButton} textStyle={textStyle.button} status="white" icon={MessageCircleIconFill} onPress={this.onMessagePress}>
							MESSAGE
						</Button>
					</View>
					<ProfileSocials style={themedStyle.profileSocials} textStyle={themedStyle.socialsLabel} followers={socials.followers} following={socials.following} posts={socials.posts} onFollowersPress={this.onFollowersPress} onFollowingPress={this.onFollowingPress} onPostsPress={this.onPostsPress} />
				</ImageOverlay>
				<View style={[ themedStyle.profileSection, themedStyle.aboutSection ]}>
					<Text style={themedStyle.profileSectionLabel} category="s1">
						About
					</Text>
					<Text style={[ themedStyle.profileSectionContent, themedStyle.profileAboutLabel ]} appearance="hint">
						{artist.about}
					</Text>
				</View>
				<View style={[ themedStyle.profileSection, themedStyle.friendsSection ]}>
					<Text style={[ themedStyle.profileSectionLabel, themedStyle.friendsSectionLabel ]}>Friends</Text>
					{/* <ProfileFriendList contentContainerStyle={[ themedStyle.profileSectionContent, themedStyle.friendsList ]} data={artist.friends} onItemPress={this.onFriendPress} /> */}
				</View>
				<View style={themedStyle.profileSection}>
					<Text style={themedStyle.profileSectionLabel}>Shots</Text>
					<ProfileActivityList3 contentContainerStyle={[ themedStyle.profileSectionContent ]} data={activities.map(this.createActivitySource)} onItemPress={this.onPhotoPress} />
				</View>
			</ContainerView>
		);
	}
}

export const ArtistDetails = withStyles(ArtistDetailsComponent, (theme: ThemeType) => ({
	container: {
		flex: 1,
		backgroundColor: theme['background-basic-color-2'],
	},
	profileInfoContainer: {
		paddingHorizontal: 24,
		paddingVertical: 24,
	},
	profileSocials: {
		justifyContent: 'space-evenly',
		marginTop: 24,
		paddingVertical: 16,
	},
	actionContainer: {
		flexDirection: 'row',
		marginTop: 32,
	},
	profileSection: {
		marginTop: 32,
	},
	profileSectionContent: {
		marginTop: 8,
	},
	socialsLabel: {
		color: 'white',
	},
	followButton: {
		flex: 1,
		marginRight: 4,
	},
	messageButton: {
		flex: 1,
		marginLeft: 4,
	},
	profileSectionLabel: {
		marginHorizontal: 16,
		...textStyle.subtitle,
	},
	aboutSection: {
		marginTop: 24,
	},
	profileAboutLabel: {
		marginHorizontal: 16,
		...textStyle.paragraph,
	},
	shotsSection: {
		marginBottom: 32,
	},
	friendsList: {
		paddingHorizontal: 12,
	},
}));
