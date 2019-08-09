import React from 'react';
import { withStyles, ThemedComponentProps, ThemeType } from '@kitten/theme';
import { textStyle, ContainerView } from '@src/components/common';
import { AddPaymentCardForm } from './addPaymentCardForm.component';
import { Button } from 'react-native-ui-kitten/ui';
import { ActivityIndicator } from 'react-native';
// import { CreditCardModel as State } from '@favid-inc/api';

interface ComponentProps {
  loading: boolean;
  onSend: (creditCard) => void;
}

interface State {
  formValue: any;
}

export type CreditCardComponentProps = ThemedComponentProps & ComponentProps;

class CreditCardComponent extends React.Component<CreditCardComponentProps, State> {
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
        <AddPaymentCardForm onFormValueChange={this.onFormValueChange.bind(this)} />
        <Button
          style={themedStyle.saveButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!this.state.formValue || loading}
          onPress={this.props.onSend.bind(this, this.state.formValue)}
        >
          {loading ? 'Processando...' : 'Save'}
        </Button>
      </ContainerView>
    );
  }
}

export const CreditCard = withStyles(CreditCardComponent, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  saveButton: {
    marginVertical: 20,
  },
}));
