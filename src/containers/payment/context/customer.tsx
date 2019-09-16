import { PayOrder } from '@favid-inc/api/lib/app-customer';
import React from 'react';

import { AuthContext } from '@src/core/auth';

export type Customer = PayOrder['Request']['data']['customer'];

interface Props {
  children: React.ReactNode;
}

interface State extends Customer {
  setBirthday: (birthday: Customer['birthday']) => void;
  setCountry: (country: Customer['country']) => void;
  setDocuments: (documents: Customer['documents']) => void;
  setEmail: (email: Customer['email']) => void;
  setExternalId: (external_id: Customer['external_id']) => void;
  setName: (name: Customer['name']) => void;
  setPhoneNumbers: (phone_numbers: Customer['phone_numbers']) => void;
  setType: (type: Customer['type']) => void;
  isValid: () => boolean;
}

export const CustomerContext = React.createContext<State>(null);

export class CustomerContextProvider extends React.Component<Props, State> {
  static contextType = AuthContext;
  public context: React.ContextType<typeof AuthContext>;

  public state: State = {
    birthday: '',
    country: 'br',
    documents: [],
    email: '',
    external_id: '',
    name: '',
    phone_numbers: [],
    type: 'individual',
    setBirthday: (birthday) => this.setState({ birthday }),
    setCountry: (country) => this.setState({ country }),
    setDocuments: (documents) => this.setState({ documents }),
    setEmail: (email) => this.setState({ email }),
    setExternalId: (external_id) => this.setState({ external_id }),
    setName: (name) => this.setState({ name }),
    setPhoneNumbers: (phone_numbers) => this.setState({ phone_numbers }),
    setType: (type) => this.setState({ type }),
    isValid: () =>
      Boolean(
        this.state.name &&
          this.state.documents &&
          this.state.documents[0] &&
          this.state.documents[0].number &&
          this.state.phone_numbers &&
          this.state.phone_numbers[0] &&
          this.state.email,
      ),
  };
  public componentDidMount() {
    const { user } = this.context;
    this.state.setName(user.displayName);
    this.state.setEmail(user.email), this.state.setPhoneNumbers([user.phoneNumber]);
  }

  public render() {
    return (
      <CustomerContext.Provider value={this.state}>
        <CustomerContext.Consumer>{() => this.props.children}</CustomerContext.Consumer>
      </CustomerContext.Provider>
    );
  }
}
