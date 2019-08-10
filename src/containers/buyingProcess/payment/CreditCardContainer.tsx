import { connect } from 'react-redux';
import React, { Component } from 'react';
import { CreditCard } from './CreditCard';
import * as config from '../../../core/config';
import * as actions from '../../../store/actions';
import { Payment as PaymentModel } from '../../../core/model';
import { axiosInstance } from '../../../core/utils/axios';

interface State {
  loading: boolean;
}

interface CreditCardContainerProps {
  idToken: string;
  onSetPaymentToken: (paymentToken: string) => void;
}

class CreditCardContainerComponent extends Component<CreditCardContainerProps, State> {
  public state: State = {
    loading: false,
  };

  public onSend = async (payment: PaymentModel) => {
    const axios = axiosInstance(this.props.idToken);
    const response = await axios.post('/paymentToken', payment);
    this.props.onSetPaymentToken(response.data.paymentToken);
  };

  public render(): React.ReactNode {
    const { loading } = this.state;
    return <CreditCard loading={loading} onSend={this.onSend.bind(this)} />;
  }
}

const mapStateToProps = ({ auth }) => ({ idToken: auth.authState.idToken });

const mapDispatchToProps = dispatch => ({
  onSetPaymentToken: (paymentToken: string) => dispatch(actions.setPaymentToken(paymentToken)),
});

export const CreditCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreditCardContainerComponent);
