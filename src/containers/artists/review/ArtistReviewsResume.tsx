import React from 'react';
import { Text } from '@kitten/ui';
import { View } from 'react-native';
import { ArtistRate } from '@src/core/model';
import { RateBar } from '@src/components/common';
import { textStyle } from '@src/components/common/style';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';

type Props = ThemedComponentProps & ArtistRate;

class ArtistReviewsResumeComponent extends React.Component<Props> {
  public render() {
    const { themedStyle, message, rate, customerName } = this.props;
    return (
      <View style={themedStyle.container}>
        <View style={themedStyle.row}>
          <RateBar
            style={themedStyle.rateBar}
            max={5}
            value={rate}
            iconStyle={{ width: 18, height: 18 }}
            iconDisabledStyle={{ tintColor: '#dedede', width: 15, height: 15 }}
          />
          <Text
            appearance='hint'
            style={[themedStyle.paragraph, { maxWidth: 160, flexWrap: 'wrap' }]}
            numberOfLines={1}
          >
            {customerName}
          </Text>
        </View>
        <View style={themedStyle.message}>
          <Text appearance='hint' style={themedStyle.paragraph}>
            {`"${message}"`}
          </Text>
        </View>
      </View>
    );
  }
}

export const ArtistReviewsResume = withStyles(ArtistReviewsResumeComponent, () => ({
  container: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    marginTop: 5,
  },
  paragraph: textStyle.paragraph,
}));
