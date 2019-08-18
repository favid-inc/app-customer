import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { ContainerView, textStyle } from '@src/components/common';
import { Payment as PaymentModel } from '@src/core/model';
import React from 'react';
import { Button } from 'react-native-ui-kitten/ui';
import { PaymentCardForm } from './PaymentCardForm';

interface ComponentProps {
  loading: boolean;
  onSend: (payment: PaymentModel) => void;
}

interface State {
  formValue: any;
}

export type PaymentComponentProps = ThemedComponentProps & ComponentProps;

class Component extends React.Component<PaymentComponentProps, State> {
  public state: State = {
    formValue: null,
  };

  public onFormValueChange(formValue) {
    this.setState({ formValue: formValue ? { ...formValue } : formValue });
  }

  public render() {
    const { themedStyle, loading } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        <PaymentCardForm onFormValueChange={this.onFormValueChange.bind(this)} />
        <Button
          status='success'
          style={themedStyle.saveButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!this.state.formValue || loading}
          onPress={this.props.onSend.bind(this, this.state.formValue)}
        >
          {loading ? 'Processando...' : 'Enviar'}
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
