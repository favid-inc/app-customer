import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Avatar, Text } from '@kitten/ui';
import { textStyle } from '@src/components/common';
import React from 'react';
import { ImageSourcePropType, View, ViewProps } from 'react-native';

interface ComponentProps {
  photo: ImageSourcePropType;
  name: string;
  email?: string;
  location?: string;
  mainCategory?: string;
}
export type ProfileInfoProps = ThemedComponentProps & ViewProps & ComponentProps;

class ProfileInfoComponent extends React.Component<ProfileInfoProps> {
  public render() {
    const { style, themedStyle, photo, name, email, location, mainCategory, ...restProps } = this.props;
    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <Avatar style={themedStyle.profileAvatar} source={ photo } />
        <Text style={themedStyle.nameLabel} category='h6'>
          {name}
        </Text>
        {email ?
          (
            <Text style={themedStyle.nameLabel} category='h6'>
              {email}
            </Text>
          )
          : null
        }
        {mainCategory ?
          (
            <Text style={themedStyle.category} appearance='hint'>
              {mainCategory}
            </Text>
          )
          : null
        }
      </View>
    );
  }
}

export const ProfileInfo = withStyles(ProfileInfoComponent, (theme: ThemeType) => ({
  container: {
    alignItems: 'center',
  },
  detailsContainer: {},
  nameLabel: {
    marginTop: 16,
    color: 'white',
    ...textStyle.headline,
  },
  locationLabel: {
    marginTop: 2,
    color: 'white',
  },
  profileAvatar: {
    width: 124,
    height: 124,
    backgroundColor: theme['background-basic-color-1'],
  },
  category: {
    color: 'white',
  },
}));
