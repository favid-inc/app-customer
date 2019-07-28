import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { ActivityBar, ActivityBarProps, CommentsButton, LikeButton, ReactionBar } from '@src/components/common';

interface ComponentProps {
  textStyle?: StyleProp<TextStyle>;
}

export type OrderCardBottomProps = ThemedComponentProps & ActivityBarProps & ComponentProps;

class OrderCardBottomComponent extends React.Component<OrderCardBottomProps> {
  public render(): React.ReactNode {
    const { themedStyle, textStyle, children, ...restProps } = this.props;

    return <ActivityBar {...restProps}>{children}</ActivityBar>;
  }
}

export const OrderCardBottom = withStyles(OrderCardBottomComponent, (theme: ThemeType) => ({}));
