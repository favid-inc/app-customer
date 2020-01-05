import { Button } from '@kitten/ui';
import React from 'react';

import { textStyle } from '@src/components/common';
import { PaymentMethodContext } from '../context';

export interface SubmitButtonProps {
  onSubmit: () => void;
  submiting?: boolean;
}

export function SubmitButton({ submiting, onSubmit }: SubmitButtonProps) {
  const paymentMethod = React.useContext(PaymentMethodContext);

  const onPress = React.useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Button
      disabled={submiting || !paymentMethod.isValid()}
      onPress={onPress}
      size='giant'
      status='success'
      style={{ marginTop: 10 }}
      textStyle={textStyle.button}
    >
      {`Pagar com ${paymentMethod.payment_method === 'boleto' ? 'Boleto' : 'Cartão'}`}
    </Button>
  );
}
