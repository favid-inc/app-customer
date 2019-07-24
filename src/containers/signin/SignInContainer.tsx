import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { NavigationScreenProps } from 'react-navigation';
import { Profile } from '@src/core/model';
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as config from '@src/core/config';
import * as AppAuth from 'expo-app-auth';
import { googleImage, favidImage } from '@src/assets/images';
import { AuthState as AuthStateModel } from '@src/core/model/authState.model';

interface State {
  profile: Profile;
}

interface SignInContainerProps {
  auth: AuthStateModel;
  loading: boolean;
  onAuth: (any) => void;
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
    const result = await AppAuth.authAsync(config.auth);
    this.props.onAuth(result);
  };

  public render(): React.ReactNode {
    let signInContent = (
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

    if (this.props.loading) {
      signInContent = (
        <View style={styles.container}>
          <Text style={styles.TextStyle}>Autenticando usuário...</Text>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return signInContent;
  }
}

const mapStateToProps = ({ auth }) => ({
  auth: auth.authState,
  loading: auth.loading,
});

const mapDispatchToProps = dispatch => ({
  onAuth: authResult => dispatch(actions.auth(authResult)),
  onLoadAuthState: () => dispatch(actions.loadAuthState()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInContainer);

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
