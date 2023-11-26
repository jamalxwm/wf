import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { View, StyleSheet, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const maskHeight = SCREEN_HEIGHT * 0.25;

export default function PlaneAnimation() {
  const planeImageRef = useRef(); // reference to the plane image
  const planeWidth = useSharedValue(0); // shared value to store the plane width
  const xPos = useSharedValue(0); // initial value set to 0
  const yPos = useSharedValue(maskHeight);
  const cloudRightStartPos = useSharedValue(0);
  const cloudRightOpacity = useSharedValue(0);
  // Measure the plane image width
  const onPlaneImageLoad = () => {
    planeImageRef.current.measure((fx, fy, width, height) => {
      planeWidth.value = width;
      xPos.value = -width; // update xPos when we know the width

      // Initiate the animation after we measure the width
      xPos.value = withRepeat(
        withDelay(
          5000,
          withTiming(SCREEN_WIDTH, { duration: 5000, easing: Easing.quad })
        ),
        -1 // repeat indefinitely
      );
      yPos.value = withRepeat(
        withDelay(5000, withTiming(0, { duration: 5000, easing: Easing.quad })),
        -1 // repeat indefinitely
      );
    });
  };

  const planeAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xPos.value }, { translateY: yPos.value }],
    };
  });

  const cloudRight = useAnimatedStyle(() => {
    return {
      opacity: cloudRightOpacity.value,
      transform: [{ translateX: cloudRightStartPos.value }],
    };
  });

  useEffect(() => {
    cloudRightStartPos.value = withRepeat(
      // move right over 1 second
      withDelay(4000, withTiming(SCREEN_WIDTH, { duration: 100000 })),
      // repeat infinitely,
      -1
    );
    cloudRightOpacity.value = withRepeat(
      withDelay(4000, withTiming(1, { duration: 3000 }))
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.mask }}>
        <MaskedView
          style={styles.circleMask}
          maskElement={<View style={styles.circleMask} />}
        >
          <Animated.Image
            ref={planeImageRef}
            onLoad={onPlaneImageLoad}
            style={[styles.plane, planeAnimation]}
            source={require('../assets/images/ui/home-plane.png')}
          />
          <Animated.Image
            style={[styles.layer, cloudRight]}
            source={require('../assets/images/ui/home-cloud-right.png')}
          />
        </MaskedView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    position: 'absolute',
    width: '100%',
    height: maskHeight,
    overflow: 'hidden',
  },
  plane: {
    position: 'absolute',
  },
  circleMask: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
    width: '90%',
    height: '100%',
    opacity: 0.75,
    alignSelf: 'center',
  },
  layer: {
    position: 'absolute',
    width: '100%', // Set the width to the screen width
    height: '100%', // Set the height equal to the width to maintain the aspect ratio
    resizeMode: 'cover',
    overflow: 'visible',
  },
});
