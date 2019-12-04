import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import React from 'react';
import { Linking, View } from 'react-native';

import { FileTextIconFill, LogOutIconFill, MenuIconMessaging } from '@src/assets/icons';
import { AuthContext } from '@src/core/auth';
import { ProfileInfo } from '@src/containers/artistDetails/profileInfo.component';
import pkg from '../../../package.json';

interface Props {
  onNavigate: (pathName: string) => void;
}

export type SettingsComponentProps = ThemedComponentProps & Props;

class SettingsComponent extends React.Component<SettingsComponentProps> {
  public render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <AccountInfo themedStyle={themedStyle} />
        <NeedHelpButton themedStyle={themedStyle} />
        <PoliciesButton themedStyle={themedStyle} onNavigate={this.handleNavigatePolicies} />
        <SigOutButton themedStyle={themedStyle} />
        <Text category='p1' appearance='hint'>Versão: {pkg.version}</Text>
      </View>
    );
  }

  private handleNavigatePolicies = () => {
    this.props.onNavigate('Políticas');
  };
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

const PoliciesButton = ({ themedStyle, onNavigate }) => {
  return (
    <Button status='primary' style={themedStyle.button} onPress={onNavigate} icon={FileTextIconFill} size='large'>
      Políticas
    </Button>
  );
};

const AccountInfo = ({ themedStyle }) => {
  const { user } = React.useContext(AuthContext);
  const userImage = {
    height: 100,
    width: 100,
    uri: user.photoURL,
  };

  return (
    <View style={themedStyle.profileInfo}>
      <ProfileInfo
        name={user.displayName}
        email={user.email}
        photo={userImage}
      />
    </View>
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
  profileInfo: {
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: theme['color-primary-400'],
  },
}));
