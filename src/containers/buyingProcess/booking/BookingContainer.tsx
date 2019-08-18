import { Order } from '@favid-inc/api';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { Booking } from './Booking';

import { BuyingProcessContext } from '../context';

interface ComponentProps {
  artistId: string;
  price: string;
  userId: number;
  idToken: string;
}

interface State {
  loading: boolean;
}

class Container extends Component<ComponentProps & NavigationScreenProps, State, typeof BuyingProcessContext> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public state: State = {
    loading: false,
  };

  public render(): React.ReactNode {
    return <Booking onSend={this.onSend} loading={this.state.loading} />;
  }

  private onSend = async (orderInstructions) => {
    const order: Order = {
      ...orderInstructions,
      artistId: 1,
      userId: 2,
    };

    this.setState({ loading: true });

    try {
      // const axios = axiosInstance(this.props.idToken);
      // const response = await axios.post(`/${OrderFlow.PLACE}`, order as OrderFlowPlaceOrderArguments);
      // if (response.status !== 200) {
      //   throw Error(response.status.toString());
      // }

      this.context.setOrder(order);
      this.props.navigation.navigate('Pagamento');
    } catch (error) {
      console.log('[BookingContainer.tsx] postOrder error:', error);
      Alert.alert('Erro ao enviar pedido');
    }
    this.setState({ loading: false });
  };
}

const mapStateToProps = ({ artist, auth }) => ({
  // artistId: artist.artist.id,
  // userId: auth.customer.uid,
  // idToken: auth.authState.idToken,
});

export const BookingContainer = connect(mapStateToProps)(Container);
