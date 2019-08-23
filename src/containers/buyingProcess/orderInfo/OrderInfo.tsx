import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { ContainerView, ScrollableAvoidKeyboard, textStyle } from '@src/components/common';
import React from 'react';
import { Platform } from 'react-native';

import { Payer } from '../context';
import { OrderInfoForm } from './OrderInfoForm';

interface ComponentProps {
  sending: boolean;
  onSend: () => void;
}

export type Props = ThemedComponentProps & ComponentProps;

class Component extends React.Component<Props> {
  private keyboardOffset: number = Platform.select({
    ios: 0,
    android: 228,
  });

  public render() {
    const { themedStyle, sending } = this.props;

    return (
      <ScrollableAvoidKeyboard style={[themedStyle.container]} extraScrollHeight={this.keyboardOffset}>
        <ContainerView style={themedStyle.container} contentContainerStyle={themedStyle.contentContainer}>
          <OrderInfoForm sending={sending} onSend={this.props.onSend} />
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
