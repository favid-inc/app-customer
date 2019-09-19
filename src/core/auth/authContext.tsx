import * as AppAuth from 'expo-app-auth';
import * as firebase from 'firebase';
import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';

import * as config from '@src/core/config';

interface AuthContext {
  user: firebase.UserInfo;
  isSignedIn: boolean;
  isSigningIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContext>(null);

interface FirebaseAuthProps {
  children: React.ReactNode;
}

interface FirebaseAuthState extends AuthContext {
  credentials:
    | { type: 'none' }
    | {
        type: 'google' | 'facebook';
        oAuthCredential: firebase.auth.OAuthCredential;
      }
    | {
        type: 'email';
        email: string;
        password: string;
      };
}

export class FirebaseAuth extends React.Component<FirebaseAuthProps, FirebaseAuthState> {
  public state: FirebaseAuthState = {
    user: null,
    credentials: { type: 'none' },
    isSignedIn: false,
    isSigningIn: true,
    signInWithGoogle: () => this.signInWithGoogle(),
    signInWithFacebook: () => this.signInWithFacebook(),
    signInWithEmailAndPassword: (email, password) => this.signInWithEmailAndPassword(email, password),
    signOut: () => this.signOut(),
    signUp: (email, password) => this.signUp(email, password),
  };

  private STORAGE_KEY: string = '@app-customer:core:auth:FirebaseAuth';

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        <AuthContext.Consumer>{() => this.props.children}</AuthContext.Consumer>
      </AuthContext.Provider>
    );
  }

  public async componentDidMount() {
    const { isSignedIn, credentials } = JSON.parse((await AsyncStorage.getItem(this.STORAGE_KEY)) || '{}');

    if (isSignedIn) {
      this.setState({ isSigningIn: true });
      try {
        await this.sigIn(credentials);
      } finally {
        this.setState({ isSigningIn: false });
      }
    } else {
      this.setState({ isSigningIn: false });
    }
  }

  private async signUp(email: string, password: string) {
    this.setState({ isSigningIn: true });

    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await user.sendEmailVerification();
      Alert.alert('Confirmação de conta', `Um email de verificação de conta foi enviado para ${user.email}.`);
    } catch (e) {
      Alert.alert('Erro ao criar conta', (e && e.message) || 'Verifique sua conexão com a internet e tente novamente');
    } finally {
      this.setState({ isSigningIn: false });
    }
  }

  private async signInWithEmailAndPassword(email: string, password: string) {
    this.setState({ isSigningIn: true });

    try {
      const auth = await this.sigIn({ type: 'email', email, password });
      if (!auth) {
        Alert.alert('Credencias inválidas', 'Não foi possível entrar no app com os dados informados');
      } else if (!auth.user.emailVerified) {
        Alert.alert('Confirmação de conta', 'Verifique seu email antes de acessar o aplicativo');
      }
    } finally {
      this.setState({ isSigningIn: false });
    }
  }

  private async signInWithGoogle() {
    this.setState({ isSigningIn: true });
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const { idToken, accessToken } = await AppAuth.authAsync(config.auth.google);
      const oAuthCredential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      await this.sigIn({ type: 'google', oAuthCredential });
    } finally {
      this.setState({ isSigningIn: false });
    }
  }

  private async signInWithFacebook() {
    this.setState({ isSigningIn: true });
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const { token } = await Facebook.logInWithReadPermissionsAsync(
        config.auth.facebook.appid,
        config.auth.facebook.options,
      );

      const oAuthCredential = firebase.auth.FacebookAuthProvider.credential(token);
      this.sigIn({ type: 'facebook', oAuthCredential });
    } finally {
      this.setState({ isSigningIn: false });
    }
  }

  private async sigIn(credentials: FirebaseAuthState['credentials']): Promise<firebase.auth.UserCredential> {
    let userCredential: firebase.auth.UserCredential;

    try {
      switch (credentials.type) {
        case 'email':
          userCredential = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
          break;
        case 'facebook':
        case 'google':
          userCredential = await firebase.auth().signInWithCredential(credentials.oAuthCredential);
          break;
        default:
          throw new Error();
      }

      this.setState({ isSignedIn: true, credentials });

      return userCredential;
    } catch (e) {
      this.setState({ isSignedIn: false, credentials: { type: 'none' } });

      Alert.alert('Desculpe', 'Infelizmente ocorreu um erro durante a autenticação');
    } finally {
      this.saveState();
    }
  }

  private async signOut() {
    this.setState({ isSignedIn: false, credentials: { type: 'none' } });
    this.saveState();
    firebase.auth().signOut();
  }

  private saveState() {
    AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
  }
}
