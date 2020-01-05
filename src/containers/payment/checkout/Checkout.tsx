import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import React from 'react';
import { View } from 'react-native';

import { ScrollableAvoidKeyboard } from '@src/components/common';

import { InfoItem } from './InfoItem';
import { OrderContext } from '../context';
import { SubmitButton } from './SubmitButton';
import { formatAmount } from './formatAmount'

interface ComponentProps {
  onSubmit: () => void;
}

export type Props = ThemedComponentProps & ComponentProps;

interface State {
  isCreditCard: boolean;
}

type Context = typeof OrderContext;

class PaymentMethodComponent extends React.Component<Props, State, Context> {
  static contextType = OrderContext;
  public context: React.ContextType<Context>;

  public render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <ScrollableAvoidKeyboard>
          <InfoItem hint='Vídeo' value={formatAmount(this.context.artistPrice)} />
          <InfoItem hint='Taxa Administrativa' value={formatAmount(this.context.serviceTax)} />
          <InfoItem hint='Total' value={formatAmount(this.context.billingAmount)} />
          <SubmitButton onSubmit={this.props.onSubmit} />
        </ScrollableAvoidKeyboard>
      </View>
    );
  }
}

export const PaymentMethod = withStyles<ComponentProps>(PaymentMethodComponent, (theme: ThemeType) => ({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  formContainer: {
    marginTop: 24,
    flexDirection: 'row',
    overflow: 'hidden',
  },
}));
