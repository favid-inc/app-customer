import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, ButtonGroup, Text } from '@kitten/ui';
import { CreditCardIconFill, FileTextIconFill } from '@src/assets/icons';
import { ContainerView, textStyle } from '@src/components/common';
import React from 'react';
import { View } from 'react-native';
import { CreditCard } from '../context';
import { PaymentCardForm } from './PaymentCardForm';

interface ComponentProps {
  loading: boolean;

  onSend: (creditCard: CreditCard) => void;
}

interface State {
  isCreditCard: boolean;
  creditCard: CreditCard;
}

export type PaymentComponentProps = ThemedComponentProps & ComponentProps;

class Component extends React.Component<PaymentComponentProps, State> {
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
    this.props.onSend(this.state.creditCard);
  };

  public render() {
    const { themedStyle, loading } = this.props;

    return (
      <ContainerView style={themedStyle.container} contentContainerStyle={themedStyle.contentContainer}>
        <View style={themedStyle.isCreditContainer}>
          <Button
            icon={CreditCardIconFill}
            style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
            status={!this.state.isCreditCard ? 'white' : ''}
            onPress={this.toggleIsCreditCard}
            size='giant'
          >
            Cartão
          </Button>
          <Button
            icon={FileTextIconFill}
            style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
            status={this.state.isCreditCard ? 'white' : ''}
            onPress={this.toggleIsCreditCard}
            size='giant'
          >
            Boleto
          </Button>
        </View>
        {this.state.isCreditCard ? <PaymentCardForm onFormValueChange={this.onFormValueChange} /> : <View />}

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
      </ContainerView>
    );
  }
}

export const Payment = withStyles(Component, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
    marginVertical: 20,
  },
}));
