import { ArtistRate } from '@favid-inc/api';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Text } from '@kitten/ui';
import React from 'react';
import { View } from 'react-native';

import { RateBar } from '@src/components/common';
import { textStyle } from '@src/components/common/style';

type Props = ThemedComponentProps & ArtistRate;

class ArtistReviewsResumeComponent extends React.Component<Props> {
  public render() {
    const { themedStyle, message, value, customerName } = this.props;
    return (
      <View style={themedStyle.container}>
        <View style={themedStyle.row}>
          <RateBar
            style={themedStyle.rateBar}
            max={5}
            value={value}
            iconStyle={themedStyle.rateIconStyle}
            iconDisabledStyle={themedStyle.rateIconDisabledStyle}
          />
          <Text appearance='hint' style={themedStyle.customerName} numberOfLines={1}>
            {customerName}
          </Text>
        </View>
        {message && (
          <View style={themedStyle.message}>
            <Text appearance='hint' style={themedStyle.paragraph}>
              {`"${message}"`}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export const ArtistReviewsResume = withStyles(ArtistReviewsResumeComponent, (themeType: ThemeType) => ({
  container: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'space-between',
  },
  customerName: {
    ...textStyle.paragraph,
    flexWrap: 'wrap',
    maxWidth: 160,
  },
  rateIconStyle: { width: 18, height: 18 },
  rateIconDisabledStyle: { tintColor: '#dedede', width: 15, height: 15 },
  message: {
    marginTop: 5,
  },
  paragraph: textStyle.paragraph,
}));
