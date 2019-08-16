import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as config from '../../../core/config';
import * as actions from '../../../store/actions';
import { axiosInstance } from '../../../core/utils/axios';
import { Alert, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { BuyingProcessContext } from '../context';
import { Charge as ChargeModel, Item as ItemModel, Payer as PayerModel, ChargeResponse } from '@src/core/model';
import { OrderInfo } from './OrderInfo';
import { Customer } from '@src/core/model';

interface State {
  loading: boolean;
}

interface OrderInfoContainerProps {
  idToken: string;
  customer: Customer;
}

type Props = OrderInfoContainerProps & NavigationScreenProps;

class Container extends Component<Props, State, typeof BuyingProcessContext> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public state: State = {
    loading: false,
  };

  public onSend = async (payer: PayerModel) => {
    this.setState({ loading: true });
    const items: ItemModel[] = [
      {
        description: this.context.order.videoInstructions,
        quantity: 1,
        price_cents: this.context.order.price,
      },
    ];
    const charge: ChargeModel = {
      method: this.context.paymentData.method,
      token: this.context.paymentData.id,
      customer_payment_method_id: null,
      restrict_payment_method: false,
      customer_id: null,
      invoice_id: null,
      email: payer.email,
      months: 1,
      discount_cents: 0,
      bank_slip_extra_days: 2,
      keep_dunning: false,
      payer,
      items,
      order_id: this.context.paymentData.id,
    };

    try {
      // todo: add request to backend
      // const axios = axiosInstance(this.props.idToken);
      // const response = await axios.post('/paymentToken', payment);
      // if (response.status !== 200) {
      //   throw Error(response.status.toString());
      // }
      console.log('[PaymentContainer.tsx] charge: ', charge);
      const response: ChargeResponse = {
        message: 'Autorizado',
        errors: {},
        success: true,
        url: 'https://faturas.iugu.com/03937a35-3208-4080-b551-f7307b581bd8-728a',
        pdf: 'https://faturas.iugu.com/03937a35-3208-4080-b551-f7307b581bd8-728a.pdf',
        identification: null,
        invoice_id: '03937A3532084080B551F7307B581BD8',
        LR: '00',
      };

      this.context.setChargeData(response);

      this.props.navigation.navigate('Confirmação');
    } catch (error) {
      console.log('[PaymentContainer.tsx] sendOrder error:', error);
      Alert.alert('Erro ao processar pagamento');
    }

    this.setState({ loading: false });
  };

  public render(): React.ReactNode {
    const { loading } = this.state;
    return <OrderInfo loading={loading} {...this.props.customer} onSend={this.onSend.bind(this)} />;
  }
}

const mapStateToProps = ({ auth }) => ({
  idToken: auth.authState.idToken,
  customer: auth.customer,
});

export const OrderInfoContainer = connect(mapStateToProps)(Container);
