import React from 'react';
import { View, ViewProps } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { textStyle, ValidationInput } from '../../../components/common';
import { Payer as PayerModel, Address as AddressModel } from '@src/core/model';
import axios from 'axios';
import {
  EmailValidator,
  CpfNumberValidator,
  PhoneNumberValidator,
  CvvValidator,
  CardholderNameValidator,
  NameValidator,
  StringValidator,
} from '../../../core/validators';
import {
  CardNumberFormatter,
  CpfNumberFormatter,
  ExpirationDateFormatter,
  PhoneNumberFormatter,
  PHONE_NUMBER_REGEX,
  CvvFormatter,
  CardholderNameFormatter,
} from '../../../core/formatters';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onFormValueChange: (value: PayerModel | undefined) => void;
}

export type OrderInfoFormProps = ThemedComponentProps & ViewProps & ComponentProps;

type State = PayerModel;

class Component extends React.Component<OrderInfoFormProps, State> {
  public state: State = {
    address: {
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      zip_code: '',
      complement: '',
    },
    cpf_cnpj: '',
    email: '',
    name: '',
    phone: '',
    phone_prefix: '',
  };

  public componentDidUpdate(prevProps: OrderInfoFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    if (becomeValid) {
      this.props.onFormValueChange(this.state);
    } else if (becomeInvalid) {
      this.props.onFormValueChange(undefined);
    }
  }

  private isValid = (value: State): boolean => {
    // const { cardNumber, expirationDate, cvv, cardholderName } = value;

    // return (
    //   cardNumber !== undefined && expirationDate !== undefined && cvv !== undefined && cardholderName !== undefined
    // );
    return false;
  };

  public onZipcodeChange = async zip_code => {
    if (zip_code.length < 8) {
      this.setState({
        address: {
          ...this.state.address,
          zip_code,
        },
      });
      return false;
    }

    const { logradouro, bairro, localidade, uf } = await axios.get(`https://viacep.com.br/ws/${zip_code}/json/`);

    const address = {
      street: logradouro,
      district: bairro,
      city: localidade,
      state: uf,
    };

    this.setState({
      address: {
        zip_code,
        ...address,
        ...this.state.address,
      },
    });
  };

  private updatePhone = phone => {
    const [prefix, extraDigit, firstNumbers, lastNumbers] = phone.match(PHONE_NUMBER_REGEX);
    this.setState({
      phone_prefix: prefix,
      phone: [extraDigit, firstNumbers, lastNumbers].join(''),
    });
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Nome'
          validator={NameValidator}
          onChangeText={name => this.setState.bind(this, { name })}
          value={this.state.name}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='CPF'
          validator={CpfNumberValidator}
          formatter={CpfNumberFormatter}
          maxLength={11}
          keyboardType='numeric'
          onChangeText={cpf_cnpj => this.setState.bind(this, { cpf_cnpj })}
          value={this.state.cpf_cnpj}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Email'
          validator={EmailValidator}
          keyboardType='email-address'
          onChangeText={email => this.setState.bind(this, { email })}
          value={this.state.email}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Telefone'
          validator={PhoneNumberValidator}
          formatter={PhoneNumberFormatter}
          maxLength={12}
          keyboardType='numeric'
          onChangeText={phone => this.updatePhone.bind(this, { phone })}
          value={this.state.cpf_cnpj}
        />
        <ValidationInput
          style={[themedStyle.input, themedStyle.longInput]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='CEP'
          validator={StringValidator}
          maxLength={6}
          onChangeText={zip_code => this.setState({ address: { ...this.state.address, zip_code } })}
          value={this.state.address.zip_code}
        />
        <View style={themedStyle.middleContainer}>
          <ValidationInput
            style={[themedStyle.input, themedStyle.shortInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='Estado'
            validator={StringValidator}
            onChangeText={state => this.setState({ address: { ...this.state.address, state } })}
            value={this.state.address.state}
          />
          <ValidationInput
            style={[themedStyle.input, themedStyle.longInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='Cidade'
            validator={StringValidator}
            onChangeText={city => this.setState({ address: { ...this.state.address, city } })}
            value={this.state.address.district}
          />
        </View>
        <ValidationInput
          style={[themedStyle.input, themedStyle.longInput]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Rua'
          validator={StringValidator}
          onChangeText={street => this.setState({ address: { ...this.state.address, street } })}
        />
        <View style={themedStyle.middleContainer}>
          <ValidationInput
            style={[themedStyle.input, themedStyle.shortInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='Número'
            validator={StringValidator}
            maxLength={6}
            onChangeText={number => this.setState({ address: { ...this.state.address, number } })}
          />
          <ValidationInput
            style={[themedStyle.input, themedStyle.longInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='District'
            validator={StringValidator}
            onChangeText={district => this.setState({ address: { ...this.state.address, district } })}
            value={this.state.address.district}
          />
        </View>

        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Complemento'
          validator={StringValidator}
          onChangeText={complement => this.setState({ address: { ...this.state.address, complement } })}
          value={this.state.address.complement}
        />

        <View style={themedStyle.middleContainer} />
      </View>
    );
  }
}

export const OrderInfoForm = withStyles(Component, (theme: ThemeType) => ({
  container: {},
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  input: {
    backgroundColor: theme['background-basic-color-1'],
  },
  longInput: {
    width: 160,
  },
  shortInput: {
    width: 80,
  },
  cardholderNameInput: {
    marginTop: 24,
  },
}));
