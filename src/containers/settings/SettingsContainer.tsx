import { ContainerView } from '@src/components/common';
import React, { Component } from 'react';
import { Text } from 'react-native-ui-kitten/ui';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Settings } from './Settings';

interface Props {
  onSignOut: () => void;
}

export class SettingsContainerComponent extends Component<NavigationScreenProps & Props> {

  public render(): React.ReactNode {
    return (
      <ContainerView style={{ flex: 1 }}>
        <Text appearance='hint' style={{ textAlign: 'center' }} category='h5'>
          Configurações
        </Text>

        <Settings
          onNavigate={(pathName: string) => this.onNavigate(pathName)}
          onSignOut={this.props.onSignOut.bind(this)}
        />
      </ContainerView>
    );
  }
  private onNavigate = (pathName: string): void => {
    this.props.navigation.navigate(pathName);
  };
}

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => dispatch(actions.signOut()),
});

export const SettingsContainer = connect(
  null,
  mapDispatchToProps,
)(SettingsContainerComponent);
