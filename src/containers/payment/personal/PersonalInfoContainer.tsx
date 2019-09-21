import { PayOrder } from '@favid-inc/api/lib/app-customer';
import React from 'react';
import { Alert, Linking } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { apiClient } from '@src/core/utils/apiClient';
import { PersonalInfo } from './PersonalInfo';

interface State {
  submiting: boolean;
}

type Props = NavigationScreenProps;

export class PersonalInfoContainer extends React.Component<Props, State> {
  public state: State = {
    submiting: false,
  };

  public render() {
    return <PersonalInfo submiting={this.state.submiting} onSubmit={this.onSubmit} />;
  }

  private onSubmit = async (data: PayOrder['Request']['data']) => {
    this.setState({ submiting: true });

    try {
      const request: PayOrder['Request'] = {
        url: '/PayOrder',
        method: 'POST',
        data,
      };

      const response: PayOrder['Response'] = await apiClient.request(request);

      if (response.status !== 200) {
        throw Error(response.status.toString());
      }

      const transaction = response.data;

      Alert.alert(
        'Dados de pagamento enviados com sucesso!',
        'Seu pedido está sera realizado logo após a confirmação.',
        [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.popToTop();
              this.props.navigation.goBack(null);
              if (transaction.payment_method === 'boleto') {
                setTimeout(() => Linking.openURL(transaction.boleto_url), 1000);
              }
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

    this.setState({ submiting: false });
  };
}
