import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import { Video } from 'expo-av';

import { ThemedComponentProps, ThemeType, withStyles } from 'react-native-ui-kitten/theme';
import { Button } from 'react-native-ui-kitten/ui';

class VideoComp extends Component<ThemedComponentProps> {
  public state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    shouldPlay: true,
    isPlaying: true,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: false,
  };

  public onLoad(data) {
    console.log('On load fired!', data);
    // this.setState({ duration: data.duration });
  }
  public onProgress(data) {
    console.log(data);
    // this.setState({ currentTime: data.currentTime });
  }
  public onBuffer({ isBuffering }: { isBuffering: boolean }) {
    console.log(isBuffering);
    // this.setState({ isBuffering });
  }
  public onError(e) {
    console.log('erro ao reproduzir video:', e);
    // this.setState({ isBuffering });
  }

  public onPress() {
    console.log(this.state.isPlaying);
    this.setState({ isPlaying: !this.state.isPlaying, shouldPlay: !this.state.shouldPlay });
    console.log(this.state.isPlaying);
  }

  public render() {
    const { themedStyle } = this.props;
    return (
      <View>
        <Button onPress={this.onPress.bind(this)}>Play</Button>
        <Video
          source={{
            uri:
              'https://www.apple.com/105/media/us/macbook-pro/2018/0dd75dfc-8b9d-4504-b14e-68176d0d8859/hero/hero_large.mp4',
          }}
          rate={this.state.rate}
          isPlaying={this.state.isPlaying}
          shouldPlay={this.state.shouldPlay}
          volume={this.state.volume}
          muted={this.state.muted}
          ignoreSilentSwitch={this.state.ignoreSilentSwitch}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={() => {
            Alert.alert('Done!');
          }}
          repeat={true}
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.onError} // Callback when video cannot be loaded
          style={themedStyle.video}
        />
      </View>
    );
  }
}
export const VideoComponent = withStyles(VideoComp, (theme: ThemeType) => ({
  video: {
    height: 400,
    width: '100%',
  },
}));
