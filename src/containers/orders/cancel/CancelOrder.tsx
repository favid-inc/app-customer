import React from 'react';
import { View } from 'react-native';
import { Text } from '@kitten/ui';
import { Order } from '@favid-inc/api';

import { InfoItem } from './InfoItem';
import { ThemeType, withStyles, ThemedComponentProps } from 'react-native-ui-kitten/theme';
import { Actions } from './Actions';
import { ScrollableAvoidKeyboard } from '@src/components/common';

interface ComponentProps {
  order: Order;
}

export type Props = ComponentProps & ThemedComponentProps;

interface State {
  submitting?: boolean;
}

class CancelOrderComponent extends React.Component<Props, State> {
  public render() {
    const { order, themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <ScrollableAvoidKeyboard>
          <Text appearance='hint'>
            Confira os dados abaixo antes de cancelar o pedido.
          </Text>
          <InfoItem hint='Artista' value={order.artistArtisticName} />
          <InfoItem hint='Criado em' value={formatDate(new Date(order.statusPlacedDate))} />
          {order.isGift ? (
            <>
              <InfoItem hint='Presente?' value='Sim' />
              <InfoItem hint='De' value={order.customerName} />
              <InfoItem hint='Para' value={order.receiverName} />
            </>
          ) : (
              <>
                <InfoItem hint='Presente?' value='Não' />
                <InfoItem hint='Para' value={order.customerName} />
              </>
            )}
          <InfoItem hint='Instruções' value={order.instructions} />
          <Actions order={order} />
        </ScrollableAvoidKeyboard>
      </View>
    );
  }
}

function formatDate(date: Date) {
  const [, year, month, day] = date.toISOString().match(/(\d+)-(\d+)-(\d+)/);
  return `${day}/${month}/${year}`;
}

export const CancelOrder = withStyles<ComponentProps>(CancelOrderComponent, (theme: ThemeType) => ({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
