import { Order } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text, Toggle } from '@kitten/ui';
import { ContainerView, textStyle, ValidationInput } from '@src/components/common';
import { NameValidator } from '@src/core/validators';
import React, { Component } from 'react';
import { View, ViewProps } from 'react-native';

interface ComponentProps {
  customerName: string;
  sending: boolean;
  onSend: (order: State) => void;
}

export type BookingProps = ThemedComponentProps & ViewProps & ComponentProps;

type State = Order;

class BookingComponent extends Component<BookingProps, State> {
  public state: State = {
    isGift: false,
    customerName: '',
    receiverName: '',
    instructions: '',
  };

  public componentDidMount() {
    this.setState({ customerName: this.props.customerName });
  }

  public render() {
    const { themedStyle } = this.props;

    const giftFields = this.state.isGift && (
      <View style={themedStyle.middleContainer}>
        <ValidationInput
          label='Nome do Presenteado'
          labelStyle={textStyle.label}
          onChangeText={this.handleReceiverNameChange}
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          validator={NameValidator}
          value={this.state.receiverName}
        />
      </View>
    );

    return (
      <ContainerView style={themedStyle.container} contentContainerStyle={themedStyle.contentContainer}>
        <View style={themedStyle.formContainer}>
          <View style={themedStyle.middleContainer}>
            <Text appearance='hint' category='s2' style={themedStyle.tittleLabel}>
              Para Presente?
            </Text>
            <Toggle checked={this.state.isGift} style={themedStyle.isGift} onChange={this.handleIsGiftChange} />
          </View>
          <View style={themedStyle.middleContainer}>
            <ValidationInput
              label='Meu Nome'
              labelStyle={textStyle.label}
              onChangeText={this.handleCustomerNameChange}
              style={themedStyle.input}
              textStyle={textStyle.paragraph}
              validator={NameValidator}
              value={this.state.customerName}
            />
          </View>
          {giftFields}
          <View style={themedStyle.middleContainer}>
            <ValidationInput
              label='Instruções'
              labelStyle={textStyle.label}
              onChangeText={this.handleInstructionsChange}
              placeholder='Por favor, deseje um feliz aniversário...'
              style={themedStyle.input}
              textStyle={textStyle.paragraph}
              validator={NameValidator}
              value={this.state.instructions}
            />
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

  private handleCustomerNameChange = (customerName) => this.setState({ customerName });
  private handleInstructionsChange = (instructions) => this.setState({ instructions });
  private handleIsGiftChange = (isGift) => this.setState({ isGift });
  private handleReceiverNameChange = (receiverName) => this.setState({ receiverName });

  private handleSend = () => this.props.onSend(this.state);
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
  titleLabel: {
    minWidth: 128,
    ...textStyle.subtitle,
  },
  gift: {
    marginHorizontal: 5,
  },
  input: {
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  addButton: {
    marginVertical: 24,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
  },
}));
