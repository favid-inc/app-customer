import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import { CreditCardIconFill, FileTextIconFill } from '@src/assets/icons';
import React from 'react';
import { View } from 'react-native';

import { ScrollableAvoidKeyboard, textStyle } from '@src/components/common';
import { CreditCard } from '../context';
import { PaymentCardForm } from './PaymentCardForm';

interface ComponentProps {
  loading: boolean;
  onSend: (creditCard: CreditCard) => void;
}

export type Props = ThemedComponentProps & ComponentProps;

interface State {
  isCreditCard: boolean;
  creditCard: CreditCard;
}

class PaymentMethodComponent extends React.Component<Props, State> {
  public state: State = {
    creditCard: null,
    isCreditCard: true,
  };

  public toggleIsCreditCard = () => {
    this.setState({ isCreditCard: !this.state.isCreditCard });
  };

  public onFormValueChange = (c) => {
    if (c) {
      this.setState({ creditCard: { ...c } });
    }
  };

  public onSend = () => {
    this.props.onSend(this.state.isCreditCard ? this.state.creditCard : null);
  };

  public render() {
    const { themedStyle, loading } = this.props;

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
          {this.state.isCreditCard && <PaymentCardForm onFormValueChange={this.onFormValueChange} />}

          <Button
            status='success'
            style={themedStyle.saveButton}
            textStyle={textStyle.button}
            size='giant'
            disabled={!this.state.creditCard || loading}
            onPress={this.onSend}
          >
            {loading ? 'Processando...' : 'Próximo'}
          </Button>
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
  saveButton: {
    marginVertical: 10,
  },
}));
