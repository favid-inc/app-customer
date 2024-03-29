import { Artist } from '@favid-inc/api';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { ScrollableAvoidKeyboard } from '@src/components/common';
import { AuthContext } from '@src/core/auth';

import { Booking } from './Booking';
import { placeOrder } from './placeOrder';

type Props = NavigationScreenProps<{ artist: Artist }>;

interface State {
  artist: Artist;
  loading: boolean;
}

export class BookingContainer extends Component<Props, State> {
  public state: State = {
    artist: null,
    loading: false,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    const artist = navigation.getParam('artist');
    this.setState({ artist });
  }

  public render() {
    return (
      <ScrollableAvoidKeyboard>
        <AuthContext.Consumer>
          {({ user }) => (
            <Booking customerName={user.displayName} onSend={this.handleSend} sending={this.state.loading} />
          )}
        </AuthContext.Consumer>
      </ScrollableAvoidKeyboard>
    );
  }

  private handleSend = async (orderFormData) => {
    this.setState({ loading: true });

    try {
      const order = await placeOrder({
        ...orderFormData,
        artistId: this.state.artist.id,
      });

      this.props.navigation.navigate('Pagamento', {
        order,
      });
    } catch (error) {
      Alert.alert('Erro ao enviar pedido');
    }
    this.setState({ loading: false });
  };
}
