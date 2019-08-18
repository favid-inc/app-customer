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
import { CreditCard as CreditCard } from '@src/core/model';
import {
  CardholderNameValidator,
  CvvValidator,
  ExpirationDateValidator,
  validation,
} from '@src/core/validators';

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
    const {number, first_name, last_name, verification_value, month, year} = this.context.creditCard;
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
        number:  this.state.cardNumber,
        verification_value:  this.state.cvv,
        first_name:  this.state.cardholderName.split(' ').splice(0, 1).join(''),
        last_name:  this.state.cardholderName.split(' ').splice(1).join(' '),
        month:  this.state.expirationDate.split('/').splice(0, 1).join(''),
        year:  this.state.expirationDate.split('/').splice(1, 1).join(''),
      };
      console.log('[PaymentCardForm] bacameValid: ', creditCard);
      this.props.onFormValueChange(creditCard);
    } else if (becomeInvalid) {
      this.props.onFormValueChange(undefined);
    }
  }

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          maxLength={19}
          keyboardType='numeric'
          label='Número do Cartão'
          style={themedStyle.input}
          labelStyle={textStyle.label}
          value={this.state.cardNumber}
          textStyle={textStyle.paragraph}
          validator={cardNumberValidator}
          formatter={CardNumberFormatter}
          onChangeText={this.onCardNumberChange}
        />
        <View style={themedStyle.middleContainer}>
          <ValidationInput
            maxLength={5}
            keyboardType='numeric'
            label='Data de Expiração'
            labelStyle={textStyle.label}
            textStyle={textStyle.paragraph}
            value={this.state.expirationDate}
            validator={ExpirationDateValidator}
            formatter={ExpirationDateFormatter}
            onChangeText={this.onExpirationDateChange}
            style={[themedStyle.input, themedStyle.expireInput]}
          />
          <ValidationInput
            label='CVV'
            maxLength={3}
            keyboardType='numeric'
            value={this.state.cvv}
            validator={CvvValidator}
            formatter={CvvFormatter}
            labelStyle={textStyle.label}
            onChangeText={this.onCvvChange}
            textStyle={textStyle.paragraph}
            style={[themedStyle.input, themedStyle.cvvInput]}
          />
        </View>
        <ValidationInput
          label='Nome no Cartão'
          labelStyle={textStyle.label}
          textStyle={textStyle.paragraph}
          value={this.state.cardholderName}
          validator={CardholderNameValidator}
          formatter={CardholderNameFormatter}
          onChangeText={this.onCardHolderNameChange}
          style={[themedStyle.input, themedStyle.cardholderNameInput]}
        />
      </View>
    );
  }

  private onCardNumberChange = (cardNumber: string) => {
    console.log('[PaymentCardForm.tsx] onCardNumberChange() cardNumber: ', cardNumber);
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
    marginVertical: 40,
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
