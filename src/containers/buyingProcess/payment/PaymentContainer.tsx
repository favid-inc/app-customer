import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Payment } from './Payment';
import * as config from '../../../core/config';
import * as actions from '../../../store/actions';
import { axiosInstance } from '../../../core/utils/axios';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { BuyingProcessContext } from '../context';
import { Payment as PaymentModel, CreditCard as CreditCardModel, PaymentResponse } from '@src/core/model';

interface State {
  loading: boolean;
}

interface CreditCardContainerProps {
  idToken: string;
}

type Props = CreditCardContainerProps & NavigationScreenProps;

class Container extends Component<Props, State, typeof BuyingProcessContext> {
  static contextType = BuyingProcessContext;
  public context: React.ContextType<typeof BuyingProcessContext>;

  public state: State = {
    loading: false,
  };

  public onSend = async (creditCard: CreditCardModel) => {
    this.setState({ loading: true });

    const payment: PaymentModel = {
      creditCard,
      account_id: null,
      test: false,
      method: 'credit_card',
    };

    try {
      // todo: add request to backend
      // const axios = axiosInstance(this.props.idToken);
      // const response = await axios.post('/paymentToken', payment);
      // if (response.status !== 200) {
      //   throw Error(response.status.toString());
      // }
      console.log('[PaymentContainer.tsx] payment: ', payment);
      const response: PaymentResponse = {
        id: 'marqs é comunista e vacilão, gosta de comer batata com melão.',
        method: 'credit_card',
        extra_info: {
          brand: 'VISA',
          holder_name: 'JOHN DOE',
          display_number: 'XXXX-XXXX-XXXX-1111',
          bin: '411111',
          month: 10,
          year: 2020,
        },
        test: false,
      };
      this.context.setPaymentData(response);

      this.props.navigation.navigate('Informações do Pedido');
    } catch (error) {
      console.log('[PaymentContainer.tsx] sendOrder error:', error);
      Alert.alert('Erro ao processar pagamento');
    }

    this.setState({ loading: false });
  };

  public render(): React.ReactNode {
    const { loading } = this.state;
    return <Payment loading={loading} onSend={this.onSend.bind(this)} />;
  }
}

const mapStateToProps = ({ auth }) => ({
  idToken: auth.authState.idToken,
});

export const PaymentContainer = connect(mapStateToProps)(Container);
