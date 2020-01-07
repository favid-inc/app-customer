import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@kitten/ui';
import { SocialOrder } from '@favid-inc/api/lib/app-customer';
import { useNavigation } from 'react-navigation-hooks';

interface Props {
  order: SocialOrder;
}

export const CancelOrderButton: React.FunctionComponent<Props> = ({ order }) => {
  const { navigate } = useNavigation();

  const onPress = React.useCallback(() => {
    navigate('Cancelar Pedido', { order });
  }, [order, navigate]);

  return (
    <Button size='medium' status='danger' style={styles.button} onPress={onPress}>
      Cancelar Pedido
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
  },
});
