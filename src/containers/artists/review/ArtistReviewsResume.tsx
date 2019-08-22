import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Avatar, Text } from '@kitten/ui';
import { Icon, StarIconFill, StarIconOutline } from '@src/assets/icons';
import { RateBar } from '@src/components/common';
import { textStyle } from '@src/components/common/style';
import React from 'react';
import { ImageSourcePropType, View, ViewProps } from 'react-native';

interface RateProps extends ThemedComponentProps {
  rate: number;
}

interface Props extends RateProps {
  count: number;
  lastMessage: string;
}

class ArtistReviewsResumeComponent extends React.Component<Props> {
  public render() {
    const { themedStyle, count, lastMessage, rate } = this.props;
    return (
      <View style={themedStyle.container}>
        <Text category='h5' style={themedStyle.title}>{`${count} Reviews`}</Text>
        <View style={themedStyle.row}>
          <RateBar style={themedStyle.rateBar} hint='Estrelas' value={rate} />
        </View>
        <View style={themedStyle.message}>
          <Text appearance='hint' style={themedStyle.paragraph}>
            {`"${lastMessage}"`}
          </Text>
        </View>
      </View>
    );
  }
}

export const ArtistReviewsResume = withStyles(ArtistReviewsResumeComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'opensans-bold',
  },
  message: {
    marginVertical: 15,
  },
  paragraph: textStyle.paragraph,
}));
