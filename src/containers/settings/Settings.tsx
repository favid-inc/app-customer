import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import React from 'react';
import { Linking, View } from 'react-native';

import { FileTextIconFill, LogOutIconFill, MenuIconMessaging } from '@src/assets/icons';
import { AuthContext } from '@src/core/auth';

interface Props {
  onNavigate: (pathName: string) => void;
}

export type SettingsComponentProps = ThemedComponentProps & Props;

class SettingsComponent extends React.Component<SettingsComponentProps> {
  public render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        {/* <NavigateToAccountButton themedStyle={themedStyle} onNavigate={this.handleNavigateToAccount} /> */}
        <NeedHelpButton themedStyle={themedStyle} />
        <PoliciesButton themedStyle={themedStyle} />
        <SigOutButton themedStyle={themedStyle} />
      </View>
    );
  }
}

const SigOutButton = ({ themedStyle }) => {
  const context = React.useContext(AuthContext);
  const handleSignOutClick = React.useCallback(() => context.signOut(), [context]);

  return (
    <Button status='danger' style={themedStyle.button} onPress={handleSignOutClick} icon={LogOutIconFill} size='large'>
      Deslogar
    </Button>
  );
};

const NeedHelpButton = ({ themedStyle }) => {
  const handleClick = React.useCallback(() => Linking.openURL('https://www.favid.com.br/suporte/'), []);

  return (
    <Button status='primary' style={themedStyle.button} onPress={handleClick} icon={MenuIconMessaging} size='large'>
      Preciso de Ajuda
    </Button>
  );
};

const PoliciesButton = ({ themedStyle }) => {
  const handleClick = React.useCallback(() => Linking.openURL('https://www.favid.com.br/politicas/'), []);

  return (
    <Button status='primary' style={themedStyle.button} onPress={handleClick} icon={FileTextIconFill} size='large'>
      Politicas
    </Button>
  );
};

export const Settings = withStyles(SettingsComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  button: {
    marginVertical: 10,
  },
}));
