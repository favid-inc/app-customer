import { OrderPaymentStatus as OrderPaymentStatusType } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Chips, textStyle } from '@src/components/common';
import React from 'react';
import { Text } from 'react-native';

interface Props {
  status: OrderPaymentStatusType;
}

const orderPaymentStatusComponent: React.SFC<Props & ThemedComponentProps> = (props) => {
  const { themedStyle } = props;

  const statusLabel = (status) => {
    const statusLabels = {
      [OrderPaymentStatusType.PENDING]: 'Pagar',
    };
    if (!statusLabels[status]) {
      return 'Status não mapeado';
    }
    return statusLabels[status];
  };

  const statusColor = (status) => {
    const statusLabels = {
      [OrderPaymentStatusType.PENDING]: 'danger',
    };
    if (!statusLabels[status]) {
      return 'disabled';
    }
    return statusLabels[status];
  };

  return (
    <Chips style={[themedStyle.chips, themedStyle[statusColor(props.status)]]}>
      <Text style={themedStyle.chipsText}>{statusLabel(props.status)}</Text>
    </Chips>
  );
};

export const OrderPaymentStatus = withStyles(orderPaymentStatusComponent, (theme: ThemeType) => ({
  success: {
    backgroundColor: theme['color-success-default'],
  },
  danger: {
    backgroundColor: theme['color-danger-default'],
  },
  info: {
    backgroundColor: theme['color-info-default'],
  },
  disabled: {
    backgroundColor: theme['color-primary-disabled'],
  },
  chips: {
    width: 110,
    textAlign: 'center',
  },
  chipsText: {
    color: 'white',
    ...textStyle.subtitle,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
}));
