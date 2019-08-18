import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import React from 'react';
import { View } from 'react-native';
import { LogOutIconFill, PersonIconFill } from '../../assets/icons';

interface Props {
  onSignOut: () => void;
  onNavigate: (pathName: string) => void;
}

export type SettingsComponentProps = ThemedComponentProps & Props;

class SettingsComponent extends React.Component<SettingsComponentProps> {
  public render(): React.ReactNode {
    const { themedStyle, onNavigate } = this.props;

    return (
      <View style={themedStyle.container}>
        <Button
          status='info'
          style={themedStyle.Button}
          onPress={onNavigate.bind(this, 'Conta')}
          icon={PersonIconFill}
          size='giant'
        >
          Conta
        </Button>

        <Button
          status='danger'
          style={themedStyle.Button}
          size='giant'
          onPress={this.props.onSignOut.bind(this)}
          icon={LogOutIconFill}
        >
          Deslogar
        </Button>
      </View>
    );
  }
}

export const Settings = withStyles(SettingsComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  Button: {
    marginVertical: 20,
  },
}));
