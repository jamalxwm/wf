import { Text, StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  Keyframe,
  BounceInRight,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';
import PlaneAnimation from './PlaneAnimation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WindowAnimation() {
  const cloudLeftStartPos = useSharedValue(-100);
  const FadeInAndScaleOutdoorScene = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ scale: 0.4 }],
    },
    100: {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
  });
  const FadeInAndScaleIndoorScene = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ scale: 0.8 }],
    },
    100: {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
  });
  const FadeInAndScaleFurniture = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ scale: 0.9 }],
    },
    100: {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
  });

  const cloudLeft = useAnimatedStyle(() => ({
    
    transform: [{ translateX: cloudLeftStartPos.value }],
  }));

  useEffect(() => {
    cloudLeftStartPos.value = withRepeat(
      // move right over 1 second
      withDelay(4000, withTiming(SCREEN_WIDTH, { duration: 80000 })),
      // repeat infinitely,
      -1
    );
  }, []);
  return (
    <View style={styles.container}>
      <Animated.Image
        entering={FadeInAndScaleOutdoorScene.duration(3000)}
        source={require('../assets/images/ui/window-layer-0.png')}
        style={{ ...styles.layer }}
      />
      <Animated.Image
        entering={FadeInAndScaleOutdoorScene.duration(3000)}
        source={require('../assets/images/ui/window-layer-1.png')}
        style={{ ...styles.layer }}
      />
      <PlaneAnimation/>
      <Animated.Image
        entering={FadeInAndScaleIndoorScene.duration(1000).delay(2000)}
        source={require('../assets/images/ui/window-layer-2.png')}
        style={{ ...styles.layer }}
      />
      <Animated.Image
        style={[styles.layer, cloudLeft]}
        source={require('../assets/images/ui/home-cloud-left.png')}
      />
      <Animated.Image
        entering={FadeInAndScaleFurniture.duration(500).delay(3000)}
        source={require('../assets/images/ui/window-layer-3.png')}
        style={{ ...styles.layer }}
      />
      <Animated.Image
        entering={BounceInRight.delay(3500)}
        source={require('../assets/images/ui/window-layer-4.png')}
        style={{ ...styles.layer }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    position: 'absolute',
    width: SCREEN_WIDTH, // Set the width to the screen width
    height: SCREEN_WIDTH, // Set the height equal to the width to maintain the aspect ratio
    resizeMode: 'cover',
    overflow: 'visible',
  },
});
