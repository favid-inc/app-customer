import { PayOrder } from '@favid-inc/api/lib/app-customer';
import { Charge, Payer } from '@src/core/model';
import { Customer } from '@src/core/model';
import { apiClient } from '@src/core/utils/apiClient';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { BuyingProcessContext } from '../context';
import { OrderInfo } from './OrderInfo';
interface State {
  loading: boolean;
}

interface ComponentProps {
  idToken: string;
  customer: Customer;
}

type Props = ComponentProps & NavigationScreenProps;

export class OrderInfoContainer extends Component<Props, State, typeof BuyingProcessContext> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public state: State = {
    loading: false,
  };

  public onSend = async (payer: Payer) => {
    this.setState({ loading: true });

    const charge: Charge = {
      order: this.context.order,
      paymentToken: {
        data: this.context.creditCard,
      },
      directCharge: {
        payer,
      },
    };

    try {
      // todo: add request to backend
      const request: PayOrder['Request'] = {
        url: '/PayOrder',
        method: 'POST',
        data: (charge as unknown) as PayOrder['Request']['data'],
      };

      const response = await apiClient.request<PayOrder['Response']>(request);

      if (response.status !== 200) {
        throw Error(response.status.toString());
      }

      // this.context.setChargeData(response);

      Alert.alert(
        'Pagamento enviado com sucesso!',
        'Seu pedido está sendo processado.',
        [{ text: 'OK', onPress: () => this.props.navigation.navigate('Orders') }],
        { cancelable: false },
      );
    } catch (error) {
      Alert.alert('Erro ao processar pagamento');
    }

    this.setState({ loading: false });
  };

  public render(): React.ReactNode {
    const { loading } = this.state;
    return <OrderInfo loading={loading} {...this.props.customer} onSend={this.onSend} />;
  }
}
