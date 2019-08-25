import { SocialArtist } from '@favid-inc/api/lib/app-customer';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Text } from '@kitten/ui';
import { textStyle } from '@src/components/common';
import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';

interface ComponentProps {
  artist: SocialArtist;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
  onOrdersPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export type ProfileSocialsProps = ThemedComponentProps & ViewProps & ComponentProps;

class ProfileSocialsComponent extends React.Component<ProfileSocialsProps> {
  public render() {
    const { style, themedStyle, textStyle: derivedTextStyle, artist, ...restProps } = this.props;

    const { followers, orders } = artist;

    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <TouchableOpacity
          activeOpacity={0.65}
          style={themedStyle.parameterContainer}
          onPress={this.onFollowersButtonPress}
        >
          <Text style={[themedStyle.valueLabel, derivedTextStyle]}>{`${followers}`}</Text>
          <Text style={[themedStyle.hintLabel, derivedTextStyle]} appearance='hint' category='s2'>
            Seguidores
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.65}
          style={themedStyle.parameterContainer}
          onPress={this.onOrdersButtonPress}
        >
          <Text style={[themedStyle.valueLabel, derivedTextStyle]}>{`${orders}`}</Text>
          <Text style={[themedStyle.hintLabel, derivedTextStyle]} appearance='hint' category='s2'>
            Pedidos
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  private onFollowersButtonPress = () => {
    this.props.onFollowersPress();
  };

  // private onFollowingButtonPress = () => {
  //   this.props.onFollowingPress();
  // };

  private onOrdersButtonPress = () => {
    this.props.onOrdersPress();
  };
}

export const ProfileSocials = withStyles<ComponentProps>(ProfileSocialsComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parameterContainer: {
    alignItems: 'center',
  },
  valueLabel: textStyle.caption2,
  hintLabel: textStyle.subtitle,
}));
