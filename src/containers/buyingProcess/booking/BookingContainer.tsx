import React, { Component } from 'react';
import { Booking } from './Booking';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { OrderModel } from '@favid-inc/api';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

interface ComponentProps {
  loading: boolean;
  artistId: string;
  price: string;
  userId: number;
  idToken: string;
  error: any;
  onPostOrder: (order: OrderModel, idToken: string) => void;
  onSignOut: () => void;
  onError: (error: any) => void;
}

class BookingContainer extends Component<ComponentProps & NavigationScreenProps> {
  private onSend(orderInstructions) {
    const order: OrderModel = {
      ...orderInstructions,
      artistId: this.props.artistId,
      userId: this.props.userId,
    };
    this.props.onPostOrder(order, this.props.idToken);
    this.props.navigation.navigate('Orders');
  }
  public shouldComponentUpdate(nextProps) {
    if (this.props.error !== nextProps || this.props.loading !== this.props.loading) {
      return true;
    }
    return false;
  }

  public render(): React.ReactNode {
    if (this.props.error) {
      const action =
        this.props.error.status === 403
          ? [
              {
                text: 'Ok, efetuar login novamente.',
                onPress: () => this.props.onSignOut(),
              },
            ]
          : null;
      Alert.alert(this.props.error.message, null, action, { cancelable: false });
      this.props.onError(null);
    }
    return <Booking onSend={(order: OrderModel) => this.onSend(order)} loading={this.props.loading} />;
  }
}

const mapStateToProps = ({ order, artist, auth }) => ({
  loading: order.loading,
  artistId: artist.artist.id,
  userId: auth.authState.uid,
  idToken: auth.authState.idToken,
  error: order.error,
});

const mapDispatchToProps = dispatch => ({
  onError: error => dispatch(actions.orderError(error)),
  onPostOrder: (order: OrderModel, idToken: string) => dispatch(actions.postOrder(order, idToken)),
  onSignOut: () => dispatch(actions.signOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingContainer);
