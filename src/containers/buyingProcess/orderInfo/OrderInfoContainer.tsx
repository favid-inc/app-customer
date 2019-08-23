import { PayOrder } from '@favid-inc/api/lib/app-customer';
import { apiClient } from '@src/core/utils/apiClient';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { BuyingProcessContext } from '../context';
import { OrderInfo } from './OrderInfo';
interface State {
  sending: boolean;
}

type Props = NavigationScreenProps;

export class PayerContainer extends Component<Props, State, typeof BuyingProcessContext> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public state: State = {
    sending: false,
  };

  public onSend = async () => {
    this.setState({ sending: true });

    const charge = {
      order: this.context.order,
      paymentToken: {
        data: this.context.creditCard,
      },
      directCharge: {
        payer: this.context.payer,
      },
    };

    try {
      const request: PayOrder['Request'] = {
        url: '/PayOrder',
        method: 'POST',
        data: charge,
      };

      const response = await apiClient.request<PayOrder['Response']>(request);

      if (response.status !== 200) {
        throw Error(response.status.toString());
      }

      Alert.alert(
        'Pagamento enviado com sucesso!',
        'Seu pedido está sendo processado.',
        [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('Orders');
              setTimeout(() => Linking.openURL((response.data as any).url), 1000);
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    } catch (error) {
      Alert.alert('Erro ao processar pagamento', 'Verifique sua conexão e tente novamente');
    }

    this.setState({ sending: false });
  };

  public render() {
    const { sending } = this.state;
    return <OrderInfo sending={sending} onSend={this.onSend} />;
  }
}
