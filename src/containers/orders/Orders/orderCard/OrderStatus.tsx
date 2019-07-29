import React, { Component } from 'react';
import { Chips, textStyle } from '@src/components/common';
import { Text } from 'react-native';
import { OrderStatus as OrderStatusType } from '@favid-inc/api';
import { withStyles, ThemedComponentProps, ThemeType } from 'react-native-ui-kitten/theme';

interface Props {
  status: OrderStatusType;
}

const orderStatusComponent: React.SFC<Props & ThemedComponentProps> = props => {
  const { themedStyle } = props;

  const statusLabel = status => {
    const statusLabels = {
      [OrderStatusType.OPENED]: 'Pendente',
      [OrderStatusType.DECLINED_BY_ARTIST]: 'Recusado',
      [OrderStatusType.DONE]: 'Concluído',
    };
    if (!statusLabels[status]) {
      return 'Status não mapeado';
    }
    return statusLabels[status];
  };

  const statusColor = status => {
    const statusLabels = {
      [OrderStatusType.OPENED]: 'info',
      [OrderStatusType.DECLINED_BY_ARTIST]: 'danger',
      [OrderStatusType.DONE]: 'success',
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
