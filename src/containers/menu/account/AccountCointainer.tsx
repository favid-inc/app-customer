import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { Profile } from '@src/core/model';
import { profile1 } from '@src/core/data/profile';
import { Account } from '@src/containers/menu/account/Account';
import * as actions from '../../../store/actions';

interface State {
  profile: Profile;
}

interface AccountContainerProps {
  auth: object;
}

type Props = NavigationScreenProps & AccountContainerProps;

class AccountContainer extends Component<Props, State> {
  public state: State = {
    profile: profile1,
  };

  private onUploadPhotoButtonPress = () => {};

  private onButtonPress = () => {
    this.props.navigation.goBack();
  };

  public componentDidMount() {
    this.setState((prevState) => {
      const profile: Profile = {
        ...prevState.profile,
        photo: {
          ...prevState.profile.photo,
        },
      };
      profile.firstName = this.props.auth.displayName.split(' ')[0];
      profile.lastName = this.props.auth.displayName.split(' ')[1];
      const imageSource = { height: 80, width: 80, url: this.props.auth.photoURL };
      profile.photo.imageSource = imageSource;
      profile.email = this.props.auth.email;
      return {
        profile,
      };
    });
  }

  public render(): React.ReactNode {
    return <Account profile={this.state.profile} onUploadPhotoButtonPress={this.onUploadPhotoButtonPress} onButtonPress={this.props.onSignOut} />;
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth });
const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => dispatch(actions.signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
