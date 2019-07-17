import React, { Component } from 'react';
import { Booking } from './Booking';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

class BookingContainer extends Component {
  private onSend(...model) {
    console.log('sending:', model);
  }

  public render(): React.ReactNode {
    return <Booking onSend={this.onSend} />;
  }
}

export default BookingContainer;
