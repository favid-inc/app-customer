import { Profile } from '@src/core/model';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { AuthContext } from '@src/core/auth';
import { Account } from './Account';

interface State {
  profile: Profile;
}

interface AccountContainerProps {
  onSignOut: () => void;
}

type Props = NavigationScreenProps & AccountContainerProps;

export class AccountContainer extends Component<Props, State> {
  static contextType = AuthContext;
  public context: React.ContextType<typeof AuthContext>;

  public state: State = {
    profile: null,
  };

  public componentDidMount() {
    this.setState(() => {
      const imageSource = {
        uri: this.context.user.photoURL,
        height: 100,
        width: 100,
      };
      const profile: Profile = {
        firstName: this.context.user.displayName.split(' ')[0],
        lastName: this.context.user.displayName.split(' ')[1],
        photo: { imageSource },
        email: this.context.user.email,
      };

      return {
        profile,
      };
    });
  }

  public render() {
    let account = <ActivityIndicator size='large' />;
    if (this.state.profile) {
      account = <Account profile={this.state.profile} onUploadPhotoButtonPress={this.onUploadPhotoButtonPress} />;
    }
    return account;
  }

  private onUploadPhotoButtonPress = () => {};
}
