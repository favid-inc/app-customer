import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import React from 'react';
import { Platform } from 'react-native';

import { ContainerView, ScrollableAvoidKeyboard } from '@src/components/common';

import { AddressForm } from './AddressForm';
import { CustomerForm } from './CustomerForm';
import { SubmitButton } from './SubmitButton';

interface ComponentProps {
  onSubmit: () => void;
}

export type Props = ThemedComponentProps & ComponentProps;

class PersonalInfoComponent extends React.Component<Props> {
  private keyboardOffset: number = Platform.select({
    ios: 0,
    android: 228,
  });

  public render() {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard style={[themedStyle.container]} extraScrollHeight={this.keyboardOffset}>
        <ContainerView style={themedStyle.container} contentContainerStyle={themedStyle.contentContainer}>
          <CustomerForm />
          <AddressForm />
          <SubmitButton onSubmit={this.props.onSubmit} />
        </ContainerView>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const PersonalInfo = withStyles<ComponentProps>(PersonalInfoComponent, (theme: ThemeType) => ({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  contentContainer: {
    flex: 1,
  },
  continueButton: {
    marginVertical: 20,
  },
}));
