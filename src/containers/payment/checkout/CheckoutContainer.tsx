import React from 'react';
import { NavigationScreenProps } from 'react-navigation';

// import { Checkout } from './Checkout';

interface State {
  submiting: boolean;
}

type Props = NavigationScreenProps;

export class CheckoutContainer extends React.Component<Props, State> {
  public state: State = {
    submiting: false,
  };

  public render() {
    // return <Checkout onSubmit={this.onSubmit} />;
    return null;
  }

  public onSubmit = () => {
    this.props.navigation.navigate('Checkout');
  };
}
