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

  return (
    <Button
      disabled={submiting || !address.isValid() || !customer.isValid()}
      onPress={onPress}
      size='giant'
      status='success'
      style={{ marginTop: 10 }}
      textStyle={textStyle.button}
    >
      Continuar
    </Button>
  );
}
