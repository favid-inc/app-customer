import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import { ContainerView, ScrollableAvoidKeyboard, textStyle } from '@src/components/common';
import React from 'react';
import { Platform } from 'react-native';

import { Payer } from '../context';
import { OrderInfoForm } from './PayerForm';

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

  private keyboardOffset: number = Platform.select({
    ios: 0,
    android: 228,
  });

  public onFormValueChange = (payer: Payer) => {
    if (payer) {
      this.setState({ payer: { ...payer } });
    }
  };

  public onSend = () => {
    this.props.onSend(this.state.payer);
  };

  public render() {
    const { themedStyle, loading } = this.props;

    return (
      <ScrollableAvoidKeyboard style={[themedStyle.container]} extraScrollHeight={this.keyboardOffset}>
        <ContainerView style={themedStyle.container} contentContainerStyle={themedStyle.contentContainer}>
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
      </ScrollableAvoidKeyboard>
    );
  }
}

export const OrderInfo = withStyles(Component, (theme: ThemeType) => ({
  container: {
    padding: 10,
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
