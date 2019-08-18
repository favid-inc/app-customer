import { Order as State } from '@favid-inc/api';
import { ContainerView, textStyle, ValidationInput } from '@src/components/common';
import { NameValidator } from '@src/core/validators';
import React, { Component } from 'react';
import { View, ViewProps } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from 'react-native-ui-kitten/theme';
import { Button, Text, Toggle } from 'react-native-ui-kitten/ui';

interface ComponentProps {
  loading: boolean;
  onSend: (order: State) => void;
}

export type BookingProps = ThemedComponentProps & ViewProps & ComponentProps;

class BookingComponent extends Component<BookingProps, State> {
  public state: State = {
    isGift: false,
    customerName: '',
    receiverName: '',
    instructions: '',
  };

  public render() {
    const { themedStyle } = this.props;
    let giftFields = null;

    if (this.state.isGift) {
      giftFields = (
        <View style={themedStyle.middleContainer}>
          <ValidationInput
            value={this.state.receiverName}
            style={themedStyle.input}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='Nome Dele'
            placeholder='José'
            validator={NameValidator}
            onChangeText={(receiverName) => this.setState({ receiverName })}
          />
        </View>
      );
    }

    return (
      <ContainerView style={themedStyle.container} contentContainerStyle={themedStyle.contentContainer}>
        <View style={themedStyle.formContainer}>
          <View style={themedStyle.middleContainer}>
            <Text appearance='hint' category='s2' style={themedStyle.tittleLabel}>
              Para Presente?
            </Text>
            <Toggle
              checked={this.state.isGift}
              style={themedStyle.isGift}
              onChange={(isGift) => this.setState({ isGift })}
            />
          </View>
          <View style={themedStyle.middleContainer}>
            <ValidationInput
              value={this.state.customerName}
              style={themedStyle.input}
              textStyle={textStyle.paragraph}
              labelStyle={textStyle.label}
              label='Meu Nome'
              placeholder='João'
              validator={NameValidator}
              onChangeText={(customerName) => this.setState({ customerName })}
            />
          </View>
          {giftFields}
          <View style={themedStyle.middleContainer}>
            <ValidationInput
              value={this.state.instructions}
              style={themedStyle.input}
              textStyle={textStyle.paragraph}
              labelStyle={textStyle.label}
              label='Minha Menssagem'
              placeholder='Por favor deseje um feliz aniversário ao meu amigo Lucas Marques.'
              validator={NameValidator}
              onChangeText={(instructions) => this.setState({ instructions })}
            />
          </View>
        </View>
        <Button
          status='success'
          disabled={this.props.loading}
          size='giant'
          style={themedStyle.addButton}
          onPress={() => this.onSend()}
        >
          {this.props.loading ? 'Enviando Pedido...' : 'Enviar Pedido'}
        </Button>
      </ContainerView>
    );
  }

  private onSend() {
    this.props.onSend(this.state);
  }
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
