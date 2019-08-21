import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
// import { Button } from '@kitten/ui';
// import { CameraIconFill } from '@src/assets/icons';
import { ContainerView } from '@src/components/common';
// import { ProfilePhoto } from '@src/components/common/profilePhoto.component';
import { ProfileSetting } from '@src/components/common/profileSetting.component';
import { Profile } from '@src/core/model';
import React from 'react';
// import {  View } from 'react-native';
interface ComponentProps {
  profile: Profile;
  onUploadPhotoButtonPress: () => void;
}

export type AccountProps = ThemedComponentProps & ComponentProps;

class Accountomponent extends React.Component<AccountProps> {
  public render() {
    const { themedStyle, profile } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        {/* <View style={themedStyle.photoSection}>
          <ProfilePhoto style={themedStyle.photo} source={profile.photo.imageSource} button={this.renderPhotoButton} />
        </View> */}
        <View style={themedStyle.infoSection}>
          <ProfileSetting style={themedStyle.profileSetting} hint='First Name' value={profile.firstName} />
          <ProfileSetting style={themedStyle.profileSetting} hint='Last Name' value={profile.lastName} />
        </View>
        {/* <View style={themedStyle.contactSection}>
          <ProfileSetting style={themedStyle.profileSetting} hint='Email' value={profile.email} />
        </View>
        <View style={themedStyle.contactSection}>
          <ProfileSetting style={themedStyle.profileSetting} hint='Email' value={profile.email} />
        </View>
        <View style={themedStyle.contactSection}>
          <ProfileSetting style={themedStyle.profileSetting} hint='Email' value={profile.email} />
        </View>
        <View style={themedStyle.contactSection}>
          <ProfileSetting style={themedStyle.profileSetting} hint='Email' value={profile.email} />
        </View> */}
      </ContainerView>
    );
  }
  // private onPhotoButtonPress = () => {
  //   this.props.onUploadPhotoButtonPress();
  // };

  // private renderPhotoButton = (): React.ReactElement<ButtonProps> => {
  //   const { themedStyle } = this.props;

  //   return (
  //     <Button
  //       style={themedStyle.photoButton}
  //       activeOpacity={0.95}
  //       icon={CameraIconFill}
  //       onPress={this.onPhotoButtonPress}
  //     />
  //   );
  // };
}

export const Account = withStyles(Accountomponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  photoSection: {
    marginVertical: 20,
  },
  infoSection: {
    marginTop: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  contactSection: {
    marginTop: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  profileSetting: {
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  photo: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },
  photoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    transform: [{ translateY: 82 }],
    borderColor: theme['border-basic-color-4'],
    backgroundColor: theme['background-basic-color-4'],
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
}));
