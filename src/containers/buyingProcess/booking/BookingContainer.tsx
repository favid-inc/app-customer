import React, { Component } from 'react';
import { Booking } from './Booking';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { axiosInstance } from '../../../core/utils/axios';
import { OrderModel, OrderFlow, OrderFlowPlaceOrderArguments } from '@favid-inc/api';
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
  public state: State = {
    loading: false,
  };

  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  private onSend = async orderInstructions => {
    const order: OrderModel = {
      ...orderInstructions,
      artistId: this.props.artistId,
      userId: this.props.userId,
    };

    this.setState({ loading: true });
    try {
      const axios = axiosInstance(this.props.idToken);
      const response = await axios.post(`/${OrderFlow.PLACE}`, order as OrderFlowPlaceOrderArguments);
      if (response.status !== 200) {
        throw Error(response.status.toString());
      }
      this.context.setOrder(order);
      this.props.navigation.navigate('Pagamento');
    } catch (error) {
      console.log('[BookingContainer.tsx] postOrder error:', error);
      Alert.alert('Erro ao enviar pedido');
    }
    this.setState({ loading: false });
  };

  public render(): React.ReactNode {
    const { order } = this.context;
    console.log(order);
    return <Booking onSend={this.onSend} loading={this.state.loading} />;
  }
}

const mapStateToProps = ({ artist, auth }) => ({
  artistId: artist.artist.id,
  userId: auth.customer.uid,
  idToken: auth.authState.idToken,
});

export const BookingContainer = connect(mapStateToProps)(Container);
