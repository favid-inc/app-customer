import React from 'react';
import { Button, ButtonProps, TextProps, Text } from '@kitten/ui';
import { View } from 'react-native';

import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';

export type SocialButtonProps = ButtonProps & {
  children: TextProps['children'];
};

export type Props = ThemedComponentProps & SocialButtonProps;

export class SocialButtonComponent extends React.Component<Props> {

  public render() {
    const {
      children,
      themedStyle,
      ...props
    } = this.props;

    return (
      <View style={themedStyle.button}>
        <Button size='small' appearance='ghost' {...props} />
        <Text category='p2' appearance='hint' style={themedStyle.label}>{children}</Text>
      </View>
    );
  }
}

export const SocialButton = withStyles<SocialButtonProps>(SocialButtonComponent, (theme: ThemeType) => ({
  label: {
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 10,
  },
}));
