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
      status='success'
      textStyle={textStyle.button}
      size='giant'
      disabled={submiting || !paymentMethod.isValid()}
      onPress={onPress}
    >
      {`Pagar com ${paymentMethod.payment_method === 'boleto' ? 'Boleto' : 'Cartão'}`}
    </Button>
  );
}
