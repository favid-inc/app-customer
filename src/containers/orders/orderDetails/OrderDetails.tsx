import { Order } from '@favid-inc/api';
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from 'react-native-ui-kitten/theme';
import { VideoPlayer } from './videoPlayer';
interface Props {
  order: Order;
}

class OrderDetailsComponent extends Component<ThemedComponentProps & Props> {
  public render() {
    const { order } = this.props;
    return <OrderVideoPlayer order={order} />;
  }
}

function OrderVideoPlayer({ order }: { order: Order }) {
  const video = `${order.videoUri}`;
  const [uri, setUri] = React.useState<string>(video);

  React.useEffect(() => {
    (async () => {
      if (video.startsWith('file://')) {
        return setUri(video);
      }

      try {
        const storage = firebase.storage();
        const downloadUrl = await storage.ref(video).getDownloadURL();

        setUri(downloadUrl);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [video]);

  if (!uri || !uri.startsWith('https://')) {
    return <View />;
  }

  return <VideoPlayer uri={uri} />;
}

export const OrderDetails = withStyles(OrderDetailsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
