import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { BuyingProcessContext } from '../context';

import { textStyle, ValidationInput } from '@src/components/common';
import {
  CARD_NUMBER_REGEX,
  CardholderNameFormatter,
  CardNumberFormatter,
  CvvFormatter,
  ExpirationDateFormatter,
} from '@src/core/formatters';

import { CardholderNameValidator, CvvValidator, ExpirationDateValidator, validation } from '@src/core/validators';

import { CreditCard } from '../context';

interface ComponentProps {
  onFormValueChange: (creditCard: CreditCard | undefined) => void;
}

export type AddPaymentCardFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  cardNumber: string | undefined;
  expirationDate: string | undefined;
  cvv: string | undefined;
  cardholderName: string | undefined;
}

const cardNumberValidator = validation(CARD_NUMBER_REGEX);

class NewCardComponent extends React.Component<AddPaymentCardFormProps, State> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;
  public state: State = {
    cardNumber: undefined,
    expirationDate: undefined,
    cvv: undefined,
    cardholderName: undefined,
  };

  public componentDidMount() {
    let { number, first_name, last_name, verification_value, month, year } = this.context.creditCard;

    number = '4111 1111 1111 1111';
    first_name = 'Gabriel';
    last_name = 'Umbelino';
    verification_value = '1234';
    month = '10';
    year = '22';

    if (number) {
      this.onCardNumberChange(number);
    }
    if (month && year) {
      this.onExpirationDateChange([month, year].join('/'));
    }
    if (verification_value) {
      this.onCvvChange(verification_value);
    }
    if (first_name && last_name) {
      this.onCardHolderNameChange([first_name, last_name].join(' '));
    }
  }

  public componentDidUpdate(prevProps: AddPaymentCardFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    if (becomeValid) {
      const creditCard: CreditCard = {
        number: this.state.cardNumber,
        verification_value: this.state.cvv,
        first_name: this.state.cardholderName
          .split(' ')
          .splice(0, 1)
          .join(''),
        last_name: this.state.cardholderName
          .split(' ')
          .splice(1)
          .join(' '),
        month: this.state.expirationDate
          .split('/')
          .splice(0, 1)
          .join(''),
        year: this.state.expirationDate
          .split('/')
          .splice(1, 1)
          .join(''),
      };
      this.props.onFormValueChange(creditCard);
    } else if (becomeInvalid) {
      this.props.onFormValueChange(undefined);
    }
  }

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
          onChangeText={this.onCardNumberChange}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={cardNumberValidator}
          value={this.state.cardNumber}
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
            value={this.state.expirationDate}
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
            value={this.state.cvv}
          />
        </View>
        <ValidationInput
          formatter={CardholderNameFormatter}
          label='Nome no Cartão'
          labelStyle={textStyle.label}
          onChangeText={this.onCardHolderNameChange}
          style={[themedStyle.input, themedStyle.cardholderNameInput]}
          textStyle={textStyle.paragraph}
          validator={CardholderNameValidator}
          value={this.state.cardholderName}
        />
      </View>
    );
  }

  private onCardNumberChange = (cardNumber: string) => {
    this.setState({ cardNumber });
  };

  private onExpirationDateChange = (expirationDate: string) => {
    this.setState({ expirationDate });
  };

  private onCvvChange = (cvv: string) => {
    this.setState({ cvv });
  };

  private onCardHolderNameChange = (cardholderName: string) => {
    this.setState({ cardholderName });
  };

  private isValid = (value: State): boolean => {
    const { cardNumber, expirationDate, cvv, cardholderName } = value;
    return Boolean(cardNumber && expirationDate && cvv && cardholderName);
  };
}

export const PaymentCardForm = withStyles(NewCardComponent, (theme: ThemeType) => ({
  container: {
    marginVertical: 10,
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
}));
