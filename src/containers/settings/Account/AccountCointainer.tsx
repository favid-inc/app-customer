import { Profile } from '@src/core/model';
import { Customer as CustomerModel } from '@src/core/model/customer.model';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { Account } from './Account';

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

  private onUploadPhotoButtonPress = () => {};
}

const mapStateToProps = ({ auth }) => ({ customer: auth.customer });

export const AccountContainer = connect(mapStateToProps)(AccountContainerComponent);
