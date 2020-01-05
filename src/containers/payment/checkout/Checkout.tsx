import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import React from 'react';
import { View } from 'react-native';

import { ScrollableAvoidKeyboard } from '@src/components/common';

import { InfoItem } from './InfoItem';
import { OrderContext } from '../context';
import { SubmitButton, SubmitButtonProps } from './SubmitButton';
import { formatAmount } from './formatAmount';

type ComponentProps = SubmitButtonProps;

export type Props = ThemedComponentProps & ComponentProps;

type Context = typeof OrderContext;

class CheckoutComponent extends React.Component<Props, null, Context> {
  static contextType = OrderContext;
  public context: React.ContextType<Context>;

  public render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <ScrollableAvoidKeyboard>
          <View>
            <InfoItem hint='Vídeo' value={formatAmount(this.context.artistPrice)} />
            <InfoItem hint='Taxa Administrativa' value={formatAmount(this.context.serviceTax)} />
            <InfoItem hint='Total' value={formatAmount(this.context.billingAmount)} />
            <SubmitButton onSubmit={this.props.onSubmit} submiting={this.props.submiting} />
          </View>
        </ScrollableAvoidKeyboard>
      </View>
    );
  }
}

export const Checkout = withStyles<ComponentProps>(CheckoutComponent, (theme: ThemeType) => ({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
