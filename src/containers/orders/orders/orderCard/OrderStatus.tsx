import { OrderStatus as OrderStatusType } from '@favid-inc/api';
import { Chips, textStyle } from '@src/components/common';
import React from 'react';
import { Text } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from 'react-native-ui-kitten/theme';

interface Props {
  status: OrderStatusType;
}

const orderStatusComponent: React.SFC<Props & ThemedComponentProps> = (props) => {
  const { themedStyle } = props;

  const statusLabel = (status) => {
    const statusLabels = {
      [OrderStatusType.PLACED]: 'Pendente',
      [OrderStatusType.DECLINED]: 'Recusado',
      [OrderStatusType.FULFILLED]: 'Concluído',
    };
    if (!statusLabels[status]) {
      return 'Status não mapeado';
    }
    return statusLabels[status];
  };

  const statusColor = (status) => {
    const statusLabels = {
      [OrderStatusType.PLACED]: 'info',
      [OrderStatusType.DECLINED]: 'danger',
      [OrderStatusType.FULFILLED]: 'success',
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

export const OrderStatus = withStyles(orderStatusComponent, (theme: ThemeType) => ({
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
