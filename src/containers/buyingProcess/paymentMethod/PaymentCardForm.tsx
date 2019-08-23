import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import React from 'react';
import { View, ViewProps } from 'react-native';

import { BuyingProcessContext } from '../context';

import { textStyle, ValidationInput } from '@src/components/common';
import {
  CARD_NUMBER_REGEX,
  CardHolderNameFormatter,
  CardNumberFormatter,
  CvvFormatter,
  ExpirationDateFormatter,
} from '@src/core/formatters';

import { CardholderNameValidator, CvvValidator, ExpirationDateValidator, validation } from '@src/core/validators';

interface ComponentProps {
  onSend: () => void;
}

export type AddPaymentCardFormProps = ThemedComponentProps & ViewProps & ComponentProps;

const cardNumberValidator = validation(CARD_NUMBER_REGEX);

class PaymentCardFormComponent extends React.Component<AddPaymentCardFormProps> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public render() {
    const { style, themedStyle, ...restProps } = this.props;

    const { creditCard } = this.context;

    return (
      <View style={themedStyle.container} {...restProps}>
        <ValidationInput
          autoCompleteType='cc-number'
          formatter={CardNumberFormatter}
          keyboardType='numeric'
          label='Número do Cartão'
          labelStyle={textStyle.label}
          maxLength={19}
          onChangeText={this.onCardNumberChange}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={cardNumberValidator}
          value={creditCard.cardNumber}
        />
        <View style={themedStyle.middleContainer}>
          <ValidationInput
            autoCompleteType='cc-exp'
            formatter={ExpirationDateFormatter}
            keyboardType='numeric'
            label='Data de Expiração'
            labelStyle={textStyle.label}
            maxLength={5}
            onChangeText={this.onExpirationDateChange}
            style={[themedStyle.input, themedStyle.expireInput]}
            textStyle={textStyle.paragraph}
            validator={ExpirationDateValidator}
            value={creditCard.expirationDate}
          />
          <ValidationInput
            autoCompleteType='cc-csc'
            formatter={CvvFormatter}
            keyboardType='numeric'
            label='CVV'
            labelStyle={textStyle.label}
            maxLength={3}
            onChangeText={this.onCvvChange}
            style={[themedStyle.input, themedStyle.cvvInput]}
            textStyle={textStyle.paragraph}
            validator={CvvValidator}
            value={creditCard.cvv}
          />
        </View>
        <ValidationInput
          autoCompleteType='name'
          formatter={CardHolderNameFormatter}
          label='Nome no Cartão'
          labelStyle={textStyle.label}
          onChangeText={this.onCardHolderNameChange}
          style={[themedStyle.input, themedStyle.cardholderNameInput]}
          textStyle={textStyle.paragraph}
          validator={CardholderNameValidator}
          value={creditCard.cardHolderName}
        />

        <Button
          status='success'
          style={themedStyle.saveButton}
          textStyle={textStyle.button}
          size='giant'
          onPress={this.props.onSend}
          disabled={!this.isValid()}
        >
          Pagar com Cartão de Crédito
        </Button>
      </View>
    );
  }

  private onCardNumberChange = (cardNumber: string) => {
    this.context.setCreditCard({ ...this.context.creditCard, cardNumber });
  };

  private onExpirationDateChange = (expirationDate) => {
    this.context.setCreditCard({ ...this.context.creditCard, expirationDate });
  };

  private onCvvChange = (cvv) => {
    this.context.setCreditCard({ ...this.context.creditCard, cvv });
  };

  private onCardHolderNameChange = (cardHolderName) => {
    this.context.setCreditCard({ ...this.context.creditCard, cardHolderName });
  };

  private isValid = (): boolean => {
    const { cardNumber, expirationDate, cvv, cardHolderName: cardholderName } = this.context.creditCard;
    return Boolean(cardNumber && expirationDate && cvv && cardholderName);
  };
}

export const PaymentCardForm = withStyles(PaymentCardFormComponent, (theme: ThemeType) => ({
  container: {
    margin: 10,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  input: {
    backgroundColor: theme['background-basic-color-1'],
  },
  expireInput: {
    width: 140,
  },
  cvvInput: {
    marginLeft: 24,
    width: 64,
  },
  cardholderNameInput: {
    marginTop: 24,
  },
  saveButton: {
    marginVertical: 10,
  },
}));
