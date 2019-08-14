import React from 'react';
import { View, ViewProps, Text } from 'react-native';
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
  CepNumberValidator,
} from '../../../core/validators';
import {
  CardNumberFormatter,
  CpfNumberFormatter,
  ExpirationDateFormatter,
  PhoneNumberFormatter,
  PHONE_REGEX,
  CvvFormatter,
  CardholderNameFormatter,
  CepNumberFormatter,
  StateFormatter,
} from '../../../core/formatters';
import { BuyingProcessContext } from '../context';
interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onFormValueChange: (value: PayerModel | undefined) => void;
}

export type OrderInfoFormProps = ComponentProps & ThemedComponentProps & ViewProps;

type State = PayerModel;

class Component extends React.Component<OrderInfoFormProps, State> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

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

  public componentDidMount() {
    console.log('[OrderInfoForm] state name: ', this.state.name);
    console.log('[OrderInfoForm] context name: ', this.context.customer.displayName);
    this.setState({
      name: this.context.customer.displayName,
      email: this.context.customer.email,
    });
  }

  private isValid = (value: State): boolean => {
    // const { cardNumber, expirationDate, cvv, cardholderName } = value;

    // return (
    //   cardNumber !== undefined && expirationDate !== undefined && cvv !== undefined && cardholderName !== undefined
    // );
    return false;
  };

  public onZipcodeChange = async zip_code => {
    if (!zip_code || zip_code === this.state.address.street) {
      return;
    }
    if (zip_code.length <= 8) {
      this.setState({
        ...this.state,
        address: {
          ...this.state.address,
          zip_code,
        },
      });
      return false;
    }
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${zip_code.replace(/\D/g, '')}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;

      const address = {
        street: logradouro,
        district: bairro,
        city: localidade,
        state: uf,
      };
      this.setState({
        ...this.state,
        address: {
          ...this.state.address,
          ...address,
          zip_code,
        },
      });
    } catch (error) {
      this.setState({
        address: {
          ...this.state.address,
          zip_code,
        },
      });
      console.error(error);
    }
  };

  private updatePhone = phone => {
    const [prefix, firstNumbers, lastNumbers] = phone
      .replace(/\D/g, '')
      .match(PHONE_REGEX)
      .filter((v, i) => i && v);
    this.setState({
      phone_prefix: `(${prefix}) `,
      phone: [firstNumbers, lastNumbers].join(' '),
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
          value={this.context.customer.displayName}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='CPF'
          validator={CpfNumberValidator}
          formatter={CpfNumberFormatter}
          maxLength={14}
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
          value={this.context.customer.email}
        />

        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Telefone'
          validator={PhoneNumberValidator}
          formatter={PhoneNumberFormatter}
          maxLength={15}
          keyboardType='numeric'
          onChangeText={this.updatePhone.bind(this)}
          value={`${this.state.phone_prefix}${this.state.phone}`}
        />
        <ValidationInput
          style={[themedStyle.input, themedStyle.longInput]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='CEP'
          validator={CepNumberValidator}
          formatter={CepNumberFormatter}
          maxLength={9}
          onChangeText={this.onZipcodeChange.bind(this)}
          value={this.state.address.zip_code}
        />

        <View style={themedStyle.middleContainer}>
          <ValidationInput
            style={[themedStyle.input, themedStyle.shortInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='Estado'
            formatter={StateFormatter}
            validator={StringValidator}
            maxLength={2}
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
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Rua'
          validator={StringValidator}
          onChangeText={street => this.setState({ address: { ...this.state.address, street } })}
          value={this.state.address.street}
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
            value={this.state.address.number}
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
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: theme['background-basic-color-1'],
  },
  longInput: {
    width: 160,
    marginRight: 20,
  },
  shortInput: {
    width: 80,
    marginRight: 20,
  },
}));
