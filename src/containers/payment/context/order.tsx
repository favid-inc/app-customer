import { PayOrder } from '@favid-inc/api/lib/app-customer';
import React from 'react';

export type Order = PayOrder['Request']['data']['order'];

interface Props {
  children: React.ReactNode;
}

interface State extends Order {
  setId: (id: Order['id']) => void;
  setArtistId: (artistId: Order['artistId']) => void;
  setPrice: (price: Order['price']) => void;
}

export const OrderContext = React.createContext<State>(null);

export class OrderContextProvider extends React.Component<Props, State> {
  public state: State = {
    setId: (id) => this.setState({ id }),
    setArtistId: (artistId) => this.setState({ artistId }),
    setPrice: (price) => this.setState({ price }),
  };

  public render() {
    return (
      <OrderContext.Provider value={this.state}>
        <OrderContext.Consumer>{() => this.props.children}</OrderContext.Consumer>
      </OrderContext.Provider>
    );
  }
}
