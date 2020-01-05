import { Button } from '@kitten/ui';
import React from 'react';

import { textStyle } from '@src/components/common';
import { AddressContext, CustomerContext } from '../context';

export interface SubmitButtonProps {
  onSubmit: () => void;
  submiting?: boolean;
}

export function SubmitButton({ submiting, onSubmit }: SubmitButtonProps) {
  const address = React.useContext(AddressContext);
  const customer = React.useContext(CustomerContext);

  const onPress = React.useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  console.log("customer.isValid()", customer.isValid())

  return (
    <Button
      status='success'
      textStyle={textStyle.button}
      size='giant'
      disabled={submiting || !address.isValid() || !customer.isValid()}
      onPress={onPress}
    >
      Continuar
    </Button>
  );
}
