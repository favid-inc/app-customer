import React, { Component } from 'react';
import { ThemedComponentProps, withStyles, ThemeType } from 'react-native-ui-kitten/theme';
import { ContainerView, ValidationInput, textStyle } from '@src/components/common';
import { View, ViewProps, ActivityIndicator } from 'react-native';
import { Toggle, Text, Button, Input } from 'react-native-ui-kitten/ui';
import { NameValidator } from '@src/core/validators';
import { OrderModel as State } from '@favid-inc/api';

interface ComponentProps {
  loading: boolean;
  onSend: (order) => void;
}

export type BookingProps = ThemedComponentProps & ViewProps & ComponentProps;

class BookingComponent extends Component<BookingProps, State> {
  public state: State = {
    isGift: false,
    customerName: '',
    theirName: '',
    videoInstructions: '',
  };

  private onSend() {
    this.props.onSend(this.state);
  }

  public render() {
    const { themedStyle } = this.props;
    let giftFields = null;

    if (this.state.isGift) {
      giftFields = (
        <View style={themedStyle.middleContainer}>
          <ValidationInput
            value={this.state.theirName}
            style={themedStyle.input}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='Nome Dele'
            placeholder='José'
            validator={NameValidator}
            onChangeText={theirName => this.setState({ theirName })}
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
              onChange={isGift => this.setState({ isGift })}
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
              onChangeText={customerName => this.setState({ customerName })}
            />
          </View>
          {giftFields}
          <View style={themedStyle.middleContainer}>
            <ValidationInput
              value={this.state.videoInstructions}
              style={themedStyle.input}
              textStyle={textStyle.paragraph}
              labelStyle={textStyle.label}
              label='Minha Menssagem'
              placeholder='Por favor deseje um feliz aniversário ao meu amigo Lucas Marques.'
              validator={NameValidator}
              onChangeText={videoInstructions => this.setState({ videoInstructions })}
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
    marginTop: 40,
  },
}));
