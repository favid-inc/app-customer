import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/Index';
import { NavigationScreenProps } from 'react-navigation';
import { Profile } from '@src/core/model';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { firebaseConfig, authConfig } from '../../firebaseConfig';
import * as firebase from 'firebase';
import * as AppAuth from 'expo-app-auth';
import { googleImage, favidImage } from '@src/assets/images';

firebase.initializeApp(firebaseConfig);
interface State {
	profile: Profile;
}

interface SignInContainerProps {
	onSignIn: (any) => void;
	onLoadAuthState: () => void;
}

type props = NavigationScreenProps & SignInContainerProps;
class SignInContainer extends React.Component<props, State> {
	public state: State = {
		profile: null,
	};
	public componentWillMount() {
		this.props.onLoadAuthState();
	}
	private auth = async () => {
		try {
			const result = await AppAuth.authAsync(authConfig);
			const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
			const authData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
			const data = JSON.parse(JSON.stringify(authData)).user;
			const authState = {
				uid: data.uid,
				displayName: data.displayName,
				photoURL: data.photoURL,
				email: data.email,
				refreshToken: data.stsTokenManager.refreshToken,
				accessToken: data.stsTokenManager.refreshToken,
				expirationTime: data.stsTokenManager.refreshToken,
				redirectEventId: data.redirectEventId,
				lastLoginAt: data.lastLoginAt,
				createdAt: data.createdAt,
			};

			this.props.onSignIn(authState);
			// tslint:disable-next-line:no-console
			console.log(authState);
		} catch (e) {
			// tslint:disable-next-line:no-console
			console.log(e);
		}
	};

	public render(): React.ReactNode {
		return (
			<View style={styles.container}>
				<Image source={favidImage.imageSource} style={styles.ImageLogoStyle} />
				<Text style={styles.WelcomeText}>Bem vindo ao Favid!</Text>
				<View style={styles.contentContainer}>
					<TouchableOpacity style={styles.GooglePlusStyle} onPress={() => this.auth()}>
						<Image source={googleImage.imageSource} style={styles.ImageIconStyle} />
						<Text style={styles.TextStyle}> Continue com Google </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	onSignIn: (authState) => dispatch(actions.signIn(authState)),
	onLoadAuthState: () => dispatch(actions.loadAuthState()),
});

export default connect(null, mapDispatchToProps)(SignInContainer);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		marginHorizontal: 50,
		marginTop: 100,
	},
	contentContainer: {
		alignItems: 'center',
		marginBottom: 20,
		marginTop: 130,
	},
	GooglePlusStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		height: 50,
		width: 250,
		borderRadius: 4,
		borderColor: '#dedfe0',
		borderWidth: 1.5,
		padding: 10,
	},
	ImageIconStyle: {
		padding: 10,
		margin: 5,
		height: 25,
		width: 25,
		resizeMode: 'stretch',
	},
	ImageLogoStyle: {
		padding: 10,
		margin: 5,
		height: 150,
		width: 150,
		resizeMode: 'stretch',
	},
	TextStyle: {
		color: '#29303b',
		fontSize: 18,
		marginBottom: 4,
		marginRight: 20,
	},
	WelcomeText: {
		color: '#29303b',
		fontSize: 30,
		marginBottom: 4,
		marginRight: 20,
		textAlign: 'center',
		width: 300,
	},
});
