import React from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { PersonalInfo } from './PersonalInfo';

interface State {
  submiting: boolean;
}

type Props = NavigationScreenProps;

export class PersonalInfoContainer extends React.Component<Props, State> {
  public state: State = {
    submiting: false,
  };

  public render() {
    return <PersonalInfo onSubmit={this.onSubmit} />;
  }

  public onSubmit = () => {
    this.props.navigation.navigate('Checkout');
  };
}
