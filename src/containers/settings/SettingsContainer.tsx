import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { Settings } from './Settings';
import * as actions from '../../store/actions';
import { Text } from 'react-native-ui-kitten/ui';
import { View } from 'react-native';
import { ContainerView } from '@src/components/common';

interface Props {
  onSignOut: () => void;
}

export class SettingsContainerComponent extends Component<NavigationScreenProps & Props> {
  private onNavigate = (pathName: string): void => {
    this.props.navigation.navigate(pathName);
  };

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
}

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(actions.signOut()),
});

export const SettingsContainer = connect(
  null,
  mapDispatchToProps,
)(SettingsContainerComponent);
