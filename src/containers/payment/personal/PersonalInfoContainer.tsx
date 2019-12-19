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

      const response = await apiClient.request<PayOrder['Response']>(request);

      if (response.data.status !== 200) {
        throw Error(response.data.status.toString());
      }

      const transaction = response.data.data;

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
                Linking.openURL(transaction.boleto_url);
              }
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    } catch (error) {
      Alert.alert('Erro ao processar pagamento', 'Verifique os dados inseridos e tente novamente');
    }

    this.setState({ submiting: false });
  };
}
