import React from 'react';
import { Button, Text, IconProps, TextProps } from '@kitten/ui';
import { View } from 'react-native';

import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';

type ComponentProps = React.PropsWithChildren<{
  onPress: () => void;
  icon: IconProps;
  children: TextProps['children'];
}>;

export type Props = ThemedComponentProps & ComponentProps;

export class SocialButtonComponent extends React.Component<Props> {

  public render() {
    const { onPress, icon, children, themedStyle } = this.props;

    return (
      <View style={themedStyle.button}>
        <Button onPress={onPress} size='small' status='warning' icon={icon} appearance='ghost' />
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
