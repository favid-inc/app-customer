import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { ContainerView, textStyle } from '@src/components/common';
import { Payer } from '@src/core/model';
import React from 'react';
import { Button } from 'react-native-ui-kitten/ui';
import { OrderInfoForm } from './OrderInfoForm';

interface ComponentProps {
  loading: boolean;
  onSend: (payer: Payer) => void;
}

interface State {
  payer: Payer;
}

export type Props = ThemedComponentProps & ComponentProps;

class Component extends React.Component<Props, State> {

  public state: State = {
    payer: null,
  };

  public onFormValueChange = (payer: Payer) => {
    if (payer) {
      this.setState({ payer: { ...payer }});
    }
  };

  public onSend = () =>  {
    this.props.onSend(this.state.payer);
  }

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
          disabled={!this.state.payer || loading}
          onPress={this.onSend}
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
