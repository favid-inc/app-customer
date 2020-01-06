import React from 'react';
import { Button, ButtonProps, TextProps, Text } from '@kitten/ui';
import { View } from 'react-native';

import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';

type ComponentProps = React.PropsWithChildren<{
  children: TextProps['children'];
  icon: ButtonProps['icon'];
  onPress: ButtonProps['onPress'];
  status: ButtonProps['status'];
}>;

export type Props = ThemedComponentProps & ComponentProps;

export class SocialButtonComponent extends React.Component<Props> {

  public render() {
    const {
      children,
      icon,
      onPress,
      status,
      themedStyle,
    } = this.props;

    return (
      <View style={themedStyle.button}>
        <Button onPress={onPress} size='small' status={status} icon={icon} appearance='ghost' />
        <Text category='p2' appearance='hint' style={themedStyle.label}>{children}</Text>
      </View>
    );
  }
}

export const SocialButton = withStyles<ComponentProps>(SocialButtonComponent, (theme: ThemeType) => ({
  label: {
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 10,
  },
}));
