import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button } from '@kitten/ui';
import axios from 'axios';
import React from 'react';
import { View, ViewProps } from 'react-native';

import { textStyle, ValidationInput } from '@src/components/common';

import { CepNumberFormatter, CpfNumberFormatter, PhoneNumberFormatter, StateFormatter } from '@src/core/formatters';
import {
  CepNumberValidator,
  CpfNumberValidator,
  EmailValidator,
  NameValidator,
  PhoneNumberValidator,
  StringValidator,
} from '@src/core/validators';

import { BuyingProcessContext } from '../context';

interface ComponentProps {
  sending: boolean;
  onSend: () => void;
}

type Props = ComponentProps & ThemedComponentProps & ViewProps;

// interface State {
//   validation: {
//     address: {
//       street: boolean;
//       number: boolean;
//       district: boolean;
//       city: boolean;
//       state: boolean;
//       zip_code: boolean;
//       complement: boolean;
//     };
//     cpf_cnpj: boolean;
//     email: boolean;
//     name: boolean;
//     phone: boolean;
//     phone_prefix: boolean;
//   };
// }

type Context = typeof BuyingProcessContext;

class PayerForm extends React.Component<Props, Context> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<Context>;

  public componentDidMount() {
    this.context.setPayer({});
  }

  public render() {
    const { style, themedStyle, ...restProps } = this.props;

    const { payer } = this.context;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Nome'
          validator={NameValidator}
          onChangeText={this.onNameChange}
          value={payer.name}
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
          onChangeText={this.onCpfCnpjChange}
          value={payer.cpfCnpj}
        />

        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Email'
          validator={EmailValidator}
          keyboardType='email-address'
          onChangeText={this.onEmailChange}
          value={payer.email}
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
          onChangeText={this.onPhoneChange}
          value={payer.phone}
        />

        <ValidationInput
          style={[themedStyle.input, themedStyle.longInput]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='CEP'
          validator={CepNumberValidator}
          formatter={CepNumberFormatter}
          keyboardType='numeric'
          maxLength={9}
          onChangeText={this.onAddressZipCodeChange}
          value={payer.addressZipCode}
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
            onChangeText={this.onAddressStateChange}
            value={payer.addressState}
          />

          <ValidationInput
            style={[themedStyle.input, themedStyle.longInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='Cidade'
            validator={StringValidator}
            onChangeText={this.onAddressCityChange}
            value={payer.addressCity}
          />
        </View>

        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Rua'
          validator={StringValidator}
          onChangeText={this.onAddressStreetChange}
          value={payer.addressStreet}
        />

        <View style={themedStyle.middleContainer}>
          <ValidationInput
            keyboardType='numeric'
            label='Número'
            labelStyle={textStyle.label}
            maxLength={6}
            onChangeText={this.onAddressNumberChange}
            style={[themedStyle.input, themedStyle.shortInput]}
            textStyle={textStyle.paragraph}
            validator={StringValidator}
            value={payer.addressNumber}
          />

          <ValidationInput
            style={[themedStyle.input, themedStyle.longInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='Bairro'
            validator={StringValidator}
            onChangeText={this.onAddressDistrictChange}
            value={payer.addressDistrict}
          />
        </View>

        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Complemento'
          validator={StringValidator}
          onChangeText={this.onAddressComplementChange}
          value={payer.addressComplement}
        />
        <Button
          status='success'
          style={themedStyle.saveButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!this.isValid() || this.props.sending}
          onPress={this.props.onSend}
        >
          {this.props.sending ? 'Processando...' : `Pagar R$ ${this.context.order.price.toString().replace('.', ',')}`}
        </Button>
      </View>
    );
  }

  // public state: State = {
  //   validation: {
  //     address: {
  //       street: false,
  //       number: false,
  //       district: false,
  //       city: false,
  //       state: false,
  //       zip_code: false,
  //       complement: true,
  //     },
  //     cpf_cnpj: false,
  //     email: false,
  //     name: false,
  //     phone: false,
  //     phone_prefix: false,
  //   },
  // };

  private onAddressZipCodeChange = async (addressZipCode) => {
    this.context.setPayer({ ...this.context.payer, addressZipCode });
    if (addressZipCode && addressZipCode.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${addressZipCode.replace(/\D/g, '')}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;

        this.context.setPayer({
          ...this.context.payer,
          addressStreet: logradouro,
          addressDistrict: bairro,
          addressCity: localidade,
          addressState: uf,
        });
      } finally {
      }
    }
  };

  private onNameChange = (name) => this.context.setPayer({ ...this.context.payer, name });

  private onCpfCnpjChange = (cpfCnpj) => this.context.setPayer({ ...this.context.payer, cpfCnpj });

  private onPhoneChange = (phone) => this.context.setPayer({ ...this.context.payer, phone });

  private onEmailChange = (email) => this.context.setPayer({ ...this.context.payer, email });

  private onAddressComplementChange = (addressComplement) =>
    this.context.setPayer({ ...this.context.payer, addressComplement });

  private onAddressDistrictChange = (addressDistrict) =>
    this.context.setPayer({ ...this.context.payer, addressDistrict });

  private onAddressStreetChange = (addressStreet) => this.context.setPayer({ ...this.context.payer, addressStreet });

  private onAddressCityChange = (addressCity) => this.context.setPayer({ ...this.context.payer, addressCity });

  private onAddressStateChange = (addressState) => this.context.setPayer({ ...this.context.payer, addressState });

  private onAddressNumberChange = (addressNumber) => this.context.setPayer({ ...this.context.payer, addressNumber });

  private isValid = () => {
    // const validation = { ...state.validation, ...state.validation.address };

    // const errors = Object.keys(validation)
    //   .filter((f) => typeof validation[f] === 'boolean')
    //   .filter((f) => {
    //     return !validation[f];
    //   });

    const { payer } = this.context;

    return (
      payer.name &&
      payer.cpfCnpj &&
      payer.phone &&
      payer.email &&
      payer.addressCity &&
      payer.addressState &&
      payer.addressNumber &&
      payer.addressZipCode
    );
  };
}

// const ValidationErrors = (props) => {
//   if (!props.showErrors) {
//     return <View />;
//   }
//   const errors = Object.keys(props.validation)
//     .filter((f) => typeof props.validation[f] === 'boolean')
//     .filter((f) => !props.validation[f]);
//   return (
//     <View>
//       {errors.map((e) => (
//         <Text key={e}>Campo obrigatório: {e}</Text>
//       ))}
//     </View>
//   );
// };

export const OrderInfoForm = withStyles(PayerForm, (theme: ThemeType) => ({
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
