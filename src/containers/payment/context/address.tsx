import { PayOrder } from '@favid-inc/api/lib/app-customer';
import React from 'react';

export type Address = PayOrder['Request']['data']['address'];

interface Props {
  children: React.ReactNode;
}

interface State extends Address {
  setCity: (city: Address['city']) => void;
  setComplementary: (complementary: Address['complementary']) => void;
  setCountry: (country: Address['country']) => void;
  setNeighborhood: (neighborhood: Address['neighborhood']) => void;
  setState: (state: Address['state']) => void;
  setStreetNumber: (street_number: Address['street_number']) => void;
  setStreet: (street: Address['street']) => void;
  setZipcode: (zipcode: Address['zipcode']) => void;
  isValid: () => boolean;
}

export const AddressContext = React.createContext<State>(null);

export class AddressContextProvider extends React.Component<Props, State> {
  public state: State = {
    city: '',
    complementary: '',
    country: '',
    neighborhood: '',
    state: '',
    street: '',
    street_number: '',
    zipcode: '',
    setCity: (city) => this.setState({ city }),
    setComplementary: (complementary) => this.setState({ complementary }),
    setCountry: (country) => this.setState({ country }),
    setNeighborhood: (neighborhood) => this.setState({ neighborhood }),
    setState: (state) => this.setState({ state }),
    setStreetNumber: (street_number) => this.setState({ street_number }),
    setStreet: (street) => this.setState({ street }),
    setZipcode: (zipcode) => this.setState({ zipcode }),
    isValid: () =>
      Boolean(
        this.state.city && this.state.state && this.state.street && this.state.street_number && this.state.zipcode,
      ),
  };

  public render() {
    return (
      <AddressContext.Provider value={this.state}>
        <AddressContext.Consumer>{() => this.props.children}</AddressContext.Consumer>
      </AddressContext.Provider>
    );
  }
}
