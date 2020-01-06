import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@kitten/ui';
import { SocialOrder } from '@favid-inc/api/lib/app-customer';
import { OrderPaymentStatus } from '@favid-inc/api';
import { useNavigation } from 'react-navigation-hooks';

import { readOrderTransaction } from './readOrderTransaction';
import { Linking } from 'expo';

interface Props {
  order: SocialOrder;
}

export const PayOrderButton: React.FunctionComponent<Props> = ({ order }) => {
  const { navigate } = useNavigation();

  const onPress = React.useCallback(async () => {
    if (!order.pagarMeTransactionId) {
      navigate('Pagamento', { order });
    }

    const transaction = await readOrderTransaction({ orderId: order.id });

    if (transaction.status === OrderPaymentStatus.WAITING_PAYMENT && transaction.payment_method === 'boleto') {
      Linking.openURL(transaction.boleto_url);
    }

    if (transaction.status === OrderPaymentStatus.REFUSED) {
      navigate('Pagamento', { order });
    }
  }, [order, navigate]);

  return (
    <Button status='success' style={styles.button} size='giant' onPress={onPress}>
      Efetuar Pagamento
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
  },
});
