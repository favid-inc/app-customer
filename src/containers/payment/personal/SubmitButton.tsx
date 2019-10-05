import { PayOrder } from '@favid-inc/api/lib/app-customer';
import { Button } from '@kitten/ui';
import React from 'react';

import { textStyle } from '@src/components/common';
import { AddressContext, CustomerContext, OrderContext, PaymentMethodContext } from '../context';

export interface SubmitButtonProps {
  onSubmit: (data: PayOrder['Request']['data']) => void;
  submiting: boolean;
}

export function SubmitButton({ submiting, onSubmit }: SubmitButtonProps) {
  const address = React.useContext(AddressContext);
  const customer = React.useContext(CustomerContext);
  const order = React.useContext(OrderContext);
  const paymentMethod = React.useContext(PaymentMethodContext);

  const onPress = React.useCallback(() => {
    onSubmit({ address, customer, order, paymentMethod });
  }, [onSubmit, address, customer, order, paymentMethod]);

  return (
    <Button
      status='success'
      textStyle={textStyle.button}
      size='giant'
      disabled={submiting || !address.isValid() || !customer.isValid()}
      onPress={onPress}
    >
      {submiting ? 'Processando...' : `Pagar R$ ${order.price.toString().replace('.', ',')}`}
    </Button>
  );
}
