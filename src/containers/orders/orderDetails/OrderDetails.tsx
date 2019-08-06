import React, { Component } from 'react';
import { withStyles, ThemeType, ThemedComponentProps } from 'react-native-ui-kitten/theme';
import { ContainerView } from '@src/components/common';
import { OrderModel } from '@favid-inc/api';
import { Video } from 'expo-av';
import { View } from 'react-native';
import { VideoPlayer } from './videoPlayer';
import * as firebase from 'firebase';
interface Props {
  order: OrderModel;
}

class OrderDetailsComponent extends Component<ThemedComponentProps & Props> {
  public render(): React.ReactNode {
    const { themedStyle, order } = this.props;
    return <OrderVideoPlayer order={order} />;
  }
}

function OrderVideoPlayer({ order }: { order: OrderModel }) {
  const video = `${order.video}`;
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
