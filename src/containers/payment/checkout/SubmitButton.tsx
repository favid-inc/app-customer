import { PayOrder } from '@favid-inc/api/lib/app-customer';
import { Button } from '@kitten/ui';
import React from 'react';

import { textStyle } from '@src/components/common';
import { OrderContext, PaymentMethodContext, CustomerContext, AddressContext } from '../context';
import { formatAmount } from './formatAmount';

export interface SubmitButtonProps {
  onSubmit: (data: PayOrder['Request']['data']) => void;
  submiting?: boolean;
}

export function SubmitButton({ submiting, onSubmit }: SubmitButtonProps) {
  const order = React.useContext(OrderContext);
  const paymentMethod = React.useContext(PaymentMethodContext);
  const customer = React.useContext(CustomerContext);
  const address = React.useContext(AddressContext);

  const onPress = React.useCallback(() => {
    onSubmit({ order, paymentMethod, customer, address });
  }, [onSubmit, order, paymentMethod, customer, address]);

  return (
    <Button
      disabled={submiting}
      onPress={onPress}
      size='giant'
      status='success'
      style={{ marginTop: 10 }}
      textStyle={textStyle.button}
    >
      {`Pagar ${formatAmount(order.billingAmount)}`}
    </Button>
  );
}
