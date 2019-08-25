import React from 'react';
import { AuthContext } from '@src/core/auth';
import { RateBar } from '@src/components/common';
import { Button } from '@kitten/ui';
import { Alert, View, TextInput } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { withStyles, ThemeType, ThemedComponentProps } from '@kitten/theme';
import { ArtistRate } from '@favid-inc/api';

import { rateArtist } from './rateArtist';

type Props = NavigationScreenProps & ThemedComponentProps & NavigationScreenProps;

type State = ArtistRate;

class ArtistReviewComponent extends React.Component<Props, State> {
  static contextType = AuthContext;
  public context: React.ContextType<typeof AuthContext>;

  public state: State = {
    value: 5,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    const artistId = navigation.getParam('artistId');
    this.setState({ artistId });
  }

  public render() {
    const { themedStyle } = this.props;
    return (
      <View style={this.props.themedStyle.container}>
        <View style={themedStyle.middleContainer}>
          <TextInput
            style={themedStyle.input}
            multiline={true}
            numberOfLines={4}
            onChangeText={this.handleMessageChange}
            value={this.state.message}
          />
        </View>
        <View style={themedStyle.middleContainer}>
          <RateBar
            style={themedStyle.rateBar}
            value={this.state.value}
            max={5}
            onChange={this.handleRateChange}
            iconStyle={{ width: 50, height: 50 }}
            iconDisabledStyle={{ tintColor: '#dedede', width: 45, height: 45 }}
          />
        </View>
        <View style={themedStyle.row}>
          <Button status='danger' size='giant' appearance='ghost' style={themedStyle.button} onPress={this.onCancel}>
            Cancelar
          </Button>
          <Button status='success' size='giant' style={themedStyle.button} onPress={this.onSend}>
            Avaliar
          </Button>
        </View>
      </View>
    );
  }

  private handleMessageChange = (message) => this.setState({ message });
  private handleRateChange = (value) => this.setState({ value: value + 1 });

  private onSend = async () => {
    try {
      await rateArtist(this.state);
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Ops!', 'Estamos tendo problemas, tente novamente mais tarde.');
    }
  };

  private onCancel = () => this.props.navigation.goBack();
}

export const ArtistReview = withStyles(ArtistReviewComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: theme['background-basic-color-2'],
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    flexWrap: 'wrap',
    flex: 1,
    color: theme['text-alternative-color'],
    height: 150,
    borderRadius: 10,
    borderColor: theme['text-alternative-color'],
    borderWidth: 1,
    padding: 10,
    fontSize: 17,
    fontFamily: 'opensans-regular',

    width: '100%',
  },
  button: {
    marginHorizontal: 14,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'space-between',
  },
}));
