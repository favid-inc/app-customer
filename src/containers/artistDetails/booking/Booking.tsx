import { Order } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text, Toggle } from '@kitten/ui';
import React, { Component } from 'react';
import { TextInput, View, ViewProps } from 'react-native';

import { AuthContext } from '@src/core/auth';
import { ContainerView, textStyle, ValidationInput } from '@src/components/common';
import { NameValidator } from '@src/core/validators';

interface ComponentProps {
  customerName: string;
  sending: boolean;
  onSend: (order: Order) => void;
}

export type BookingProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  model: Order;
  validation: {
    customerName: string[];
    instructions: string[];
  };
}

type Context = typeof AuthContext;

class BookingComponent extends Component<BookingProps, State, Context> {
  static contextType = AuthContext;
  public context: React.ContextType<Context>;

  public state: State = {
    model: {
      isGift: false,
      customerName: '',
      receiverName: '',
      instructions: '',
    },
    validation: {
      customerName: [],
      instructions: [],
    },
  };

  public componentDidMount() {
    this.handleCustomerNameChange(this.context.user.displayName);
  }

  public render() {
    const { themedStyle } = this.props;

    const giftFields = this.state.model.isGift && (
      <View style={themedStyle.middleContainer}>
        <ValidationInput
          label='Nome do Presenteado'
          labelStyle={textStyle.label}
          onChangeText={this.handleReceiverNameChange}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={NameValidator}
          value={this.state.model.receiverName}
        />
      </View>
    );

    return (
      <ContainerView style={themedStyle.container} contentContainerStyle={themedStyle.contentContainer}>
        <View style={themedStyle.formContainer}>
          <View style={[themedStyle.middleContainer, themedStyle.row]}>
            <Text appearance='hint' style={themedStyle.tittleLabel}>
              Para Presente?
            </Text>
            <Toggle checked={this.state.model.isGift} style={themedStyle.isGift} onChange={this.handleIsGiftChange} />
          </View>
          <View style={themedStyle.middleContainer}>
            <ValidationInput
              label='Meu Nome'
              style={themedStyle.input}
              validator={NameValidator}
              labelStyle={textStyle.label}
              textStyle={textStyle.paragraph}
              value={this.state.model.customerName}
              onChangeText={this.handleCustomerNameChange}
            />
            {this.state.validation.customerName.map((e, i) => (
              <Text status='danger' key={i}>
                {e}
              </Text>
            ))}
          </View>
          {giftFields}
          <View style={themedStyle.middleContainer}>
            <Text appearance='hint' style={themedStyle.tittleLabel}>
              Instruções
            </Text>
            <TextInput
              maxLength={300}
              multiline={true}
              numberOfLines={4}
              style={themedStyle.textArea}
              value={this.state.model.instructions}
              onChangeText={this.handleInstructionsChange}
            />
            <Text appearance='hint' category='p1'>{`${300 -
              this.state.model.instructions.length} caracteres restantes.`}</Text>
            {this.state.validation.instructions.map((e, i) => (
              <Text status='danger' key={i}>
                {e}
              </Text>
            ))}
          </View>
        </View>
        <Button
          status='success'
          disabled={this.props.sending}
          size='giant'
          style={themedStyle.addButton}
          onPress={this.handleSend}
        >
          {this.props.sending ? 'Enviando Pedido...' : 'Enviar Pedido'}
        </Button>
      </ContainerView>
    );
  }

  public isValid() {
    const { model } = this.state;
    const customerName: string[] = !model.customerName ? ['Campo Obrigatório.'] : [];
    const instructions: string[] = !model.instructions ? ['Campo Obrigatório.'] : [];

    this.setState({ validation: { customerName, instructions } });

    return ![...customerName, ...instructions].length;
  }

  public onChange(prop) {
    this.setState({ model: { ...this.state.model, ...prop } });
  }

  private handleCustomerNameChange = (customerName) => {
    this.onChange({ customerName });
    this.setState({ validation: { ...this.state.validation, customerName: [] } });
  };
  private handleInstructionsChange = (instructions) => {
    this.onChange({ instructions });
    this.setState({ validation: { ...this.state.validation, instructions: [] } });
  };
  private handleIsGiftChange = (isGift) => this.onChange({ isGift });
  private handleReceiverNameChange = (receiverName) => this.onChange({ receiverName });
  private handleSend = () => {
    if (this.isValid()) {
      this.props.onSend(this.state.model);
    }
  };
}

export const Booking = withStyles(BookingComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  contentContainer: {
    flex: 1,
  },
  tittleLabel: {
    minWidth: 138,
    fontSize: 15,
    paddingVertical: 5,
    fontFamily: 'opensans-bold',
    borderColor: theme['background-basic-color-4'],
  },
  gift: {
    marginHorizontal: 5,
  },

  input: {
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleContainer: {
    display: 'flex',
    marginTop: 24,
  },
  addButton: {
    marginVertical: 24,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
  },
  textArea: {
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: theme['background-basic-color-3'],
    borderWidth: 1,
    height: 150,
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
    fontFamily: 'opensans-regular',
    width: '100%',
  },
}));
