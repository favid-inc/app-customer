import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import React from 'react';

import { ContainerView, textStyle } from '@src/components/common';

import { CreditCard } from '../context';

import { PaymentCardForm } from './PaymentCardForm';

interface ComponentProps {
  loading: boolean;
  onSend: (creditCard: CreditCard) => void;
}

interface State {
  creditCard: CreditCard;
}

export type PaymentComponentProps = ThemedComponentProps & ComponentProps;

class Component extends React.Component<PaymentComponentProps, State> {
  public state: State = {
    creditCard: null,
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
        <PaymentCardForm onFormValueChange={this.onFormValueChange} />
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
  },
  saveButton: {
    marginVertical: 20,
  },
}));
