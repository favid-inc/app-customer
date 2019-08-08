import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { Profile } from '@src/core/model';
import { Account } from './Account';
import { ActivityIndicator } from 'react-native';
import { Customer as CustomerModel } from '@src/core/model/customer.model';

interface State {
  profile: Profile;
}

interface AccountContainerProps {
  customer: CustomerModel;
  onSignOut: () => void;
}

type Props = NavigationScreenProps & AccountContainerProps;

class AccountContainerComponent extends Component<Props, State> {
  public state: State = {
    profile: null,
  };

  private onUploadPhotoButtonPress = () => {};

  public componentDidMount() {
    if (!this.props.customer.displayName) {
      return this.props.onSignOut();
    }
    this.setState(() => {
      const imageSource = {
        uri: this.props.customer.photoURL,
        height: 100,
        width: 100,
      };
      const profile: Profile = {
        firstName: this.props.customer.displayName.split(' ')[0],
        lastName: this.props.customer.displayName.split(' ')[1],
        photo: { imageSource },
        email: this.props.customer.email,
      };

      return {
        profile,
      };
    });
  }

  public render(): React.ReactNode {
    let account = <ActivityIndicator size='large' />;
    if (this.state.profile) {
      account = <Account profile={this.state.profile} onUploadPhotoButtonPress={this.onUploadPhotoButtonPress} />;
    }
    return account;
  }
}

const mapStateToProps = ({ auth }) => ({ customer: auth.customer });

export const AccountContainer = connect(mapStateToProps)(AccountContainerComponent);
