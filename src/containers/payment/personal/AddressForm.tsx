import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import axios from 'axios';
import React from 'react';
import { View } from 'react-native';

import { textStyle, ValidationInput } from '@src/components/common';

import { CepNumberFormatter, StateFormatter } from '@src/core/formatters';
import { CepNumberValidator, StringValidator } from '@src/core/validators';

import { AddressContext } from '../context';

type Props = ThemedComponentProps;

type Context = typeof AddressContext;

class AddressFormComponent extends React.Component<Props, Context> {
  static contextType = AddressContext;
  public context: React.ContextType<Context>;

  public render() {
    const { themedStyle } = this.props;

    return (
      <>
        <ValidationInput
          formatter={CepNumberFormatter}
          keyboardType='numeric'
          label='CEP'
          labelStyle={textStyle.label}
          maxLength={9}
          onChangeText={this.onZipcodeChange}
          style={[themedStyle.input, themedStyle.longInput]}
          textStyle={textStyle.paragraph}
          validator={CepNumberValidator}
          value={this.context.zipcode}
        />

        <View style={themedStyle.middleContainer}>
          <ValidationInput
            formatter={StateFormatter}
            label='Estado'
            labelStyle={textStyle.label}
            maxLength={2}
            onChangeText={this.context.setState}
            style={[themedStyle.input, themedStyle.shortInput]}
            textStyle={textStyle.paragraph}
            validator={StringValidator}
            value={this.context.state}
          />

          <ValidationInput
            label='Cidade'
            labelStyle={textStyle.label}
            onChangeText={this.context.setCity}
            style={[themedStyle.input, themedStyle.longInput]}
            textStyle={textStyle.paragraph}
            validator={StringValidator}
            value={this.context.city}
          />
        </View>

        <ValidationInput
          label='Rua'
          labelStyle={textStyle.label}
          onChangeText={this.context.setStreet}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={StringValidator}
          value={this.context.street}
        />

        <View style={themedStyle.middleContainer}>
          <ValidationInput
            keyboardType='numeric'
            label='Número'
            labelStyle={textStyle.label}
            maxLength={6}
            onChangeText={this.context.setStreetNumber}
            style={[themedStyle.input, themedStyle.shortInput]}
            textStyle={textStyle.paragraph}
            validator={StringValidator}
            value={this.context.street_number}
          />

          <ValidationInput
            label='Bairro'
            labelStyle={textStyle.label}
            onChangeText={this.context.setNeighborhood}
            style={[themedStyle.input, themedStyle.longInput]}
            textStyle={textStyle.paragraph}
            validator={StringValidator}
            value={this.context.neighborhood}
          />
        </View>

        <ValidationInput
          label='Complemento'
          labelStyle={textStyle.label}
          onChangeText={this.context.setComplementary}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={StringValidator}
          value={this.context.complementary}
        />
      </>
    );
  }

  private onZipcodeChange = async (zipcode: string) => {
    this.context.setZipcode(zipcode);
    if (zipcode && zipcode.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${zipcode.replace(/\D/g, '')}/json/`);
        const address = response.data;

        this.context.setStreet(address.logradouro);
        this.context.setNeighborhood(address.bairro);
        this.context.setCity(address.localidade);
        this.context.setState(address.uf);
      } finally {
      }
    }
  };
}

export const AddressForm = withStyles<{}>(AddressFormComponent, (theme: ThemeType) => ({
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
