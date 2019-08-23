import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import React from 'react';
import { View, ViewProps } from 'react-native';

import { textStyle } from '@src/components/common';
import { BuyingProcessContext } from '../context';

interface ComponentProps {
  onSend: () => void;
}

export type AddPaymentCardFormProps = ThemedComponentProps & ViewProps & ComponentProps;
class PaymentBoletoFormComponent extends React.Component<AddPaymentCardFormProps> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={themedStyle.container} {...restProps}>
        <Button
          status='success'
          style={themedStyle.saveButton}
          textStyle={textStyle.button}
          size='giant'
          onPress={this.handleSend}
        >
          Pagar com Boleto
        </Button>
      </View>
    );
  }

  private handleSend = () => {
    this.context.setCreditCard({});
    this.props.onSend();
  };
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
  saveButton: {
    marginVertical: 10,
  },
}));
