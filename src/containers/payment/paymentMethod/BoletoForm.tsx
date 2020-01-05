import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import React from 'react';
import { View, ViewProps } from 'react-native';

import { PaymentMethodContext } from '../context';

type Props = ThemedComponentProps & ViewProps;

type Context = typeof PaymentMethodContext;

class PaymentBoletoFormComponent extends React.Component<Props, null, Context> {
  static contextType = PaymentMethodContext;
  public context: React.ContextType<Context>;

  public render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={themedStyle.container} {...restProps}>
      </View>
    );
  }
}

export const PaymentBoletoForm = withStyles(PaymentBoletoFormComponent, (theme: ThemeType) => ({
  container: {
    margin: 10,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
}));
