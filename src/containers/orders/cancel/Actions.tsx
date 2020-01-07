import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from '@kitten/ui';
import { Order } from '@favid-inc/api';

import { cancelOrder } from './cancelOrder';

interface Props {
  order: Order;
}

export const Actions: React.FunctionComponent<Props> = ({ order }) => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const { pop } = useNavigation();

  const onDismiss = React.useCallback(() => {
    pop();
  }, [pop]);

  const onConfirm = React.useCallback(async () => {
    setSubmitting(true);
    try {
      await cancelOrder({ orderId: order.id });
      pop();
      Alert.alert('Sucesso', 'Pedido cancelado');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao cancelar pedido. Verifique sua conexão e tente novamente');
    } finally {
      setSubmitting(false);
    }
  }, [pop]);

  return (
    <View>
      <Text style={styles.text} appearance='hint' status='danger'>
        Tem certeza que quer cancelar o pedido?
      </Text>
      <View style={styles.container}>
        <Button
          style={styles.control}
          status='basic'
          onPress={onDismiss}
        >
          Não, desejo voltar
        </Button>
        <Button
          style={styles.control}
          status='danger'
          onPress={onConfirm}
          disabled={submitting}
        >
          Sim, cancelar pedido
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  text: {
    marginVertical: 10,
  },
  control: {
    marginHorizontal: 3,
  },
});
