import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import React from 'react';
import { View, ViewProps } from 'react-native';

import { PaymentMethodContext } from '../context';

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

export type PaymentCardFormProps = ThemedComponentProps & ViewProps & ComponentProps;

const cardNumberValidator = validation(CARD_NUMBER_REGEX);

class PaymentCardFormComponent extends React.Component<PaymentCardFormProps> {
  static contextType = PaymentMethodContext;
  public context: React.ContextType<typeof PaymentMethodContext>;

  public render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={themedStyle.container} {...restProps}>
        <ValidationInput
          autoCompleteType='cc-number'
          formatter={CardNumberFormatter}
          keyboardType='numeric'
          label='Número do Cartão'
          labelStyle={textStyle.label}
          maxLength={19}
          onChangeText={this.context.setCardNumber}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={cardNumberValidator}
          value={this.context.card_number}
        />
        <View style={themedStyle.middleContainer}>
          <ValidationInput
            autoCompleteType='cc-exp'
            formatter={ExpirationDateFormatter}
            keyboardType='numeric'
            label='Data de Expiração'
            labelStyle={textStyle.label}
            maxLength={5}
            onChangeText={this.context.setCardExpirationDate}
            style={[themedStyle.input, themedStyle.expireInput]}
            textStyle={textStyle.paragraph}
            validator={ExpirationDateValidator}
            value={this.context.card_expiration_date}
          />
          <ValidationInput
            autoCompleteType='cc-csc'
            formatter={CvvFormatter}
            keyboardType='numeric'
            label='CVV'
            labelStyle={textStyle.label}
            maxLength={4}
            onChangeText={this.context.setCardCvv}
            style={[themedStyle.input, themedStyle.cvvInput]}
            textStyle={textStyle.paragraph}
            validator={CvvValidator}
            value={this.context.card_cvv}
          />
        </View>
        <ValidationInput
          autoCompleteType='name'
          formatter={CardHolderNameFormatter}
          label='Nome no Cartão'
          labelStyle={textStyle.label}
          onChangeText={this.context.setCardHolderName}
          style={[themedStyle.input, themedStyle.cardholderNameInput]}
          textStyle={textStyle.paragraph}
          validator={CardholderNameValidator}
          value={this.context.card_holder_name}
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

  private isValid = (): boolean => {
    const { card_cvv, card_expiration_date, card_number, card_holder_name } = this.context;
    return Boolean(card_cvv && card_expiration_date && card_number && card_holder_name);
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
    width: 100,
  },
  cardholderNameInput: {
    marginTop: 24,
  },
  saveButton: {
    marginVertical: 10,
  },
}));
