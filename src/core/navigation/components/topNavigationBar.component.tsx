import { StyleType, ThemeType, withStyles } from '@kitten/theme';
import { TopNavigation, TopNavigationAction, TopNavigationActionProps, TopNavigationProps } from '@kitten/ui';
import { textStyle } from '@src/components/common';
import React from 'react';
import { ImageProps, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from './safeAreaView.component';

export interface ComponentProps {
  style?: StyleProp<ViewStyle>;
  backIcon?: BackIconProp;
  onBackPress?: () => void;
}

export type TopNavigationBarProps = TopNavigationProps & ComponentProps;

type BackIconProp = (style: StyleType) => React.ReactElement<ImageProps>;
type BackButtonElement = React.ReactElement<TopNavigationActionProps>;

class TopNavigationBarComponent extends React.Component<TopNavigationBarProps> {

  public render(): React.ReactNode {
    const { themedStyle, title, backIcon } = this.props;

    const leftControlElement: BackButtonElement | null = backIcon ? this.renderBackButton(backIcon) : null;
    return (
      <SafeAreaView style={themedStyle.safeArea}>
        <TopNavigation
          style={themedStyle.safeArea}
          alignment='center'
          title={title}
          titleStyle={textStyle.subtitle}
          subtitleStyle={textStyle.caption1}
          leftControl={leftControlElement}
        />
      </SafeAreaView>
    );
  }
  private onBackButtonPress = () => {
    if (this.props.onBackPress) {
      this.props.onBackPress();
    }
  };

  private renderBackButton = (source: BackIconProp): BackButtonElement => {
    return <TopNavigationAction icon={source} onPress={this.onBackButtonPress} />;
  };
}

export const TopNavigationBar = withStyles(TopNavigationBarComponent, (theme: ThemeType) => ({
  safeArea: {
    height: 50,
    backgroundColor: theme['background-basic-color-3'],
  },
}));
