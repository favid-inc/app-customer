import { PayOrder } from '@favid-inc/api/lib/app-customer';
import { apiClient } from '@src/core/utils/apiClient';
import React, { Component } from 'react';
import { Alert } from 'react-native';
// import { Linking } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { BuyingProcessContext } from '../context';
import { OrderInfo } from './Payer';
interface State {
  loading: boolean;
}

import { Payer } from '../context';

interface ComponentProps {
  customer: Payer;
}

type Props = ComponentProps & NavigationScreenProps;

export class PayerContainer extends Component<Props, State, typeof BuyingProcessContext> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public state: State = {
    loading: false,
  };

  public onSend = async (payer: Payer) => {
    this.setState({ loading: true });

    const charge = {
      order: this.context.order,
      paymentToken: {
        data: this.context.creditCard,
      },
      directCharge: {
        payer,
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
          { text: 'OK', onPress: () => this.props.navigation.navigate('Orders') },
          // {
          //   text: 'Comprovante',
          //   onPress: () => {
          //     this.props.navigation.navigate('Orders');
          //     Linking.openURL((response.data as any).url);
          //   },
          // },
        ],
        {
          cancelable: false,
          // onDismiss: () => this.props.navigation.navigate('Orders'),
        },
      );
    } catch (error) {
      // console.log(error);
      Alert.alert('Erro ao processar pagamento', 'Verifique sua conexão e tente novamente');
    }

    this.setState({ loading: false });
  };

  public render() {
    const { loading } = this.state;
    return <OrderInfo loading={loading} {...this.props.customer} onSend={this.onSend} />;
  }
}
