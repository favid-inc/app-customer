import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import React from 'react';

import { textStyle, ValidationInput } from '@src/components/common';

import { CpfNumberFormatter, PhoneNumberFormatter } from '@src/core/formatters';
import { CpfNumberValidator, EmailValidator, NameValidator, PhoneNumberValidator } from '@src/core/validators';

import { CustomerContext } from '../context';

type Props = ThemedComponentProps;

type Context = typeof CustomerContext;

class CustomerFormComponent extends React.Component<Props, Context> {
  static contextType = CustomerContext;
  public context: React.ContextType<Context>;

  public render() {
    const { themedStyle } = this.props;

    return (
      <>
        <ValidationInput
          label='Nome'
          labelStyle={textStyle.label}
          onChangeText={this.context.setName}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={NameValidator}
          value={this.context.name}
        />

        {this.context.documents.map((document) => (
          <ValidationInput
            formatter={CpfNumberFormatter}
            keyboardType='numeric'
            label='CPF'
            labelStyle={textStyle.label}
            maxLength={14}
            onChangeText={this.onDocumentChange}
            style={themedStyle.input}
            textStyle={textStyle.paragraph}
            validator={CpfNumberValidator}
            value={document.number}
          />
        ))}

        <ValidationInput
          keyboardType='email-address'
          label='Email'
          labelStyle={textStyle.label}
          onChangeText={this.context.setEmail}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={EmailValidator}
          value={this.context.email}
        />

        {this.context.phone_numbers.map((phone_number) => (
          <ValidationInput
            formatter={PhoneNumberFormatter}
            keyboardType='numeric'
            label='Telefone'
            labelStyle={textStyle.label}
            maxLength={15}
            onChangeText={this.onPhoneNumberChange}
            style={themedStyle.input}
            textStyle={textStyle.paragraph}
            validator={PhoneNumberValidator}
            value={phone_number}
          />
        ))}
      </>
    );
  }

  private onDocumentChange = (number) => this.context.setDocuments([{ type: 'cpf', number }]);
  private onPhoneNumberChange = (number) => this.context.setPhoneNumbers([number]);
}

export const CustomerForm = withStyles<{}>(CustomerFormComponent, (theme: ThemeType) => ({
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
