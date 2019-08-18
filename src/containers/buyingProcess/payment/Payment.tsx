import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { ContainerView, textStyle } from '@src/components/common';
import { CreditCard } from '@src/core/model';
import React from 'react';
import { Button } from 'react-native-ui-kitten/ui';
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
  }

  public onSend = () =>  {
    this.props.onSend(this.state.creditCard);
  }

  public render() {
    const { themedStyle, loading } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
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
    backgroundColor: theme['background-basic-color-2'],
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  saveButton: {
    marginVertical: 20,
  },
}));
