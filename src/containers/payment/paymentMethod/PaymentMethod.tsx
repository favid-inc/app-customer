import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import { CreditCardIconFill, FileTextIconFill } from '@src/assets/icons';
import React from 'react';
import { View } from 'react-native';

import { ScrollableAvoidKeyboard } from '@src/components/common';
import { PaymentMethodContext } from '../context';
import { PaymentBoletoForm } from './BoletoForm';
import { PaymentCardForm } from './CreditCardForm';

interface ComponentProps {
  onSend: () => void;
}

export type Props = ThemedComponentProps & ComponentProps;

interface State {
  isCreditCard: boolean;
}

type Context = typeof PaymentMethodContext;

class PaymentMethodComponent extends React.Component<Props, State, Context> {
  static contextType = PaymentMethodContext;
  public context: React.ContextType<Context>;

  public render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <ScrollableAvoidKeyboard>
          <View style={themedStyle.isCreditContainer}>
            <Button
              icon={CreditCardIconFill}
              style={{ flex: 1, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
              status={this.context.payment_method !== 'credit_card' ? 'white' : ''}
              onPress={this.selectCreditCard}
            >
              Cartão
            </Button>
            <Button
              icon={FileTextIconFill}
              style={{ flex: 1, borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
              status={this.context.payment_method !== 'boleto' ? 'white' : ''}
              onPress={this.selectBoleto}
            >
              Boleto
            </Button>
          </View>
          {this.context.payment_method === 'credit_card' ? (
            <PaymentCardForm onSend={this.props.onSend} />
          ) : (
            <PaymentBoletoForm onSend={this.props.onSend} />
          )}
        </ScrollableAvoidKeyboard>
      </View>
    );
  }

  private selectBoleto = () => {
    this.context.setPaymentMethod('boleto');
  };

  private selectCreditCard = () => {
    this.context.setPaymentMethod('credit_card');
  };
}

export const PaymentMethod = withStyles<ComponentProps>(PaymentMethodComponent, (theme: ThemeType) => ({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  creditCard: {
    borderRadiusRightBottom: 100,
  },
  isCreditContainer: {
    marginTop: 24,
    flexDirection: 'row',
    overflow: 'hidden',
  },
}));
