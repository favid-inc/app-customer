import React, { Component } from 'react';
import { ListItem, List, ListItemProps, Button, Text } from 'react-native-ui-kitten/ui';
import { withStyles, ThemeType, ThemedComponentProps, StyleType } from 'react-native-ui-kitten/theme';
import { ContainerView, Chips, textStyle } from '@src/components/common';
import { OrderModel } from '@favid-inc/api';
import { ListRenderItemInfo, ActivityIndicator } from 'react-native';

interface Props {
  orders: OrderModel[];
  onDetails: (order: OrderModel) => void;
}

class OrdersComponent extends Component<ThemedComponentProps & Props> {
  private renderCard = (info: ListRenderItemInfo<OrderModel>): React.ReactElement<ListItemProps> => {
    const { themedStyle, orders } = this.props;

    return (
      <ListItem
        onPress={this.props.onDetails.bind(this, info.item)}
        style={themedStyle.listItem}
        title={`Artista: ${info.item.artistName}`}
        description={`Instruções: ${info.item.videoInstructions}`}
        descriptionStyle={themedStyle.description}
        accessory={this.renderAccessory.bind(null, info)}
      />
    );
  };

  public renderAccessory = (info): React.ReactElement<any> => {
    const status = {
      OP: {
        status: 'info',
        text: 'Pendente',
      },
      RA: {
        status: 'danger',
        text: 'Reprovado',
      },
      DO: {
        status: 'success',
        text: 'Pronto',
      },
    };

    return (
      <Chips style={this.props.themedStyle[status[info.item.status].status]} status>
        <Text style={this.props.themedStyle.chipsText}>{status[info.item.status].text}</Text>
      </Chips>
    );
  };
  public onDetails(order: OrderModel) {
    console.log(order);
  }

  public render(): React.ReactNode {
    const { themedStyle, orders } = this.props;
    let ordersList: React.ReactNode = <ActivityIndicator size='large' />;
    if (this.props.orders) {
      ordersList = (
        <List
          style={themedStyle.listContainer}
          renderItem={this.renderCard}
          data={orders}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
    return (
      <ContainerView style={themedStyle.container} contentContainerStyle={themedStyle.contentContainer}>
        {ordersList}
      </ContainerView>
    );
  }
}

export const Orders = withStyles(OrdersComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: '100%',
    backgroundColor: theme['background-basic-color-1'],
  },
  listItem: {
    marginTop: 10,
    backgroundColor: theme['background-basic-color-3'],
  },
  success: {
    backgroundColor: theme['color-success-default'],
  },
  danger: {
    backgroundColor: theme['color-danger-default'],
  },
  info: {
    backgroundColor: theme['color-info-default'],
  },
  chipsText: {
    color: 'white',
    ...textStyle.subtitle,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  description: {
    maxWidth: 320,
    maxHeight: 100,
    overflow: 'hidden',
  },
}));
