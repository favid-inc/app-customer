import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import { CreditCardIconFill, FileTextIconFill } from '@src/assets/icons';
import React from 'react';
import { View } from 'react-native';

import { ScrollableAvoidKeyboard } from '@src/components/common';
import { PaymentBoletoForm } from './PaymentBoletoForm';
import { PaymentCardForm } from './PaymentCardForm';

interface ComponentProps {
  onSend: () => void;
}

export type Props = ThemedComponentProps & ComponentProps;

interface State {
  isCreditCard: boolean;
}

class PaymentMethodComponent extends React.Component<Props, State> {
  public state: State = {
    isCreditCard: true,
  };

  public toggleIsCreditCard = () => {
    this.setState({ isCreditCard: !this.state.isCreditCard });
  };

  public render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <ScrollableAvoidKeyboard>
          <View style={themedStyle.isCreditContainer}>
            <Button
              icon={CreditCardIconFill}
              style={{ flex: 1, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
              status={!this.state.isCreditCard ? 'white' : ''}
              onPress={this.toggleIsCreditCard}
            >
              Cartão
            </Button>
            <Button
              icon={FileTextIconFill}
              style={{ flex: 1, borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
              status={this.state.isCreditCard ? 'white' : ''}
              onPress={this.toggleIsCreditCard}
            >
              Boleto
            </Button>
          </View>
          {this.state.isCreditCard ? (
            <PaymentCardForm onSend={this.props.onSend} />
          ) : (
            <PaymentBoletoForm onSend={this.props.onSend} />
          )}
        </ScrollableAvoidKeyboard>
      </View>
    );
  }
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
