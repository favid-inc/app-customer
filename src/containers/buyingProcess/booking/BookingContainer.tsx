import React, { Component } from 'react';
import { Booking } from './Booking';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

interface ComponentProps  {
  loading: boolean;
  artistId: string;
  price: string;
  userId: number;
  onPostOrder: (any) => void;
}



class BookingContainer extends Component<ComponentProps> {
  private onSend(orderInstructions) {
    const order = {
      ...orderInstructions,
      price: this.props.price,
      artistId: this.props.artistId,
      userId: this.props.userId,
    };
    this.props.onPostOrder(order);
  }

  public render(): React.ReactNode {
    return <Booking onSend={(order) => this.onSend(order)} loading={this.props.loading}/>;
  }
}

const mapStateToProps = ({order, artist, auth}) => ({
  loading: order.loading,
  artistId: artist.artist.id,
  price: artist.artist.price,
  userId: auth.authState.uid,
});

const mapDispatchToProps = dispatch => ({
  onPostOrder: order => dispatch(actions.postOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingContainer);
