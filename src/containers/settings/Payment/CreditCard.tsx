import React from 'react';
import { withStyles, ThemeType, ThemedComponentProps } from '@kitten/theme';
import { textStyle } from '@src/components/common';
import { Text } from 'react-native';
// import { CreditCardModel as State } from '@favid-inc/api';

interface ComponentProps {
  loading: boolean;
  onSend: (creditCard) => void;
}

export type CreditCardComponentProps = ThemedComponentProps & ComponentProps;

class CreditCardComponent extends React.Component<CreditCardComponentProps> {
  public render() {
    return <Text>Credit Card</Text>;
  }
}

export const CreditCard = withStyles(CreditCardComponent, () => ({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  pagerContainer: {
    marginVertical: 8,
  },
  subtitle: {
    marginVertical: 16,
    textAlign: 'center',
    ...textStyle.subtitle,
  },
}));
