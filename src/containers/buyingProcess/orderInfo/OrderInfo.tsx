import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { ContainerView, textStyle } from '@src/components/common';
import React from 'react';

import { Payment as PaymentModel } from '@src/core/model';
import { Button } from 'react-native-ui-kitten/ui';
import { OrderInfoForm } from './OrderInfoForm';

interface ComponentProps {
  loading: boolean;
  onSend: (payment: PaymentModel) => void;
}

interface State {
  formValue: any;
}

export type Props = ThemedComponentProps & ComponentProps;

class Component extends React.Component<Props, State> {
  public state: State = {
    formValue: null,
  };

  public onFormValueChange = (formValue) => {
    this.setState({ formValue: formValue ? { ...formValue } : formValue });
  };

  public render() {
    const { themedStyle, loading } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        <OrderInfoForm onFormValueChange={this.onFormValueChange} />
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

export const OrderInfo = withStyles(Component, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  saveButton: {
    marginVertical: 20,
  },
}));
