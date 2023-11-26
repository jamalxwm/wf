import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { View, StyleSheet, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const maskHeight = SCREEN_HEIGHT * 0.25;

export default function planeAnimation() {
  const planeImageRef = useRef(); // reference to the plane image
  const planeWidth = useSharedValue(0); // shared value to store the plane width
  const xPos = useSharedValue(0); // initial value set to 0
  const yPos = useSharedValue(maskHeight);

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

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xPos.value }, { translateY: yPos.value }],
    };
  });

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
            style={[styles.plane, animatedStyles]}
            source={require('../assets/images/ui/home-plane.png')}
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
  },
  plane: {
    position: 'absolute',
  },
  circleMask: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
    width: '90%',
    height: '94%',
    opacity: 0.75,
    alignSelf: 'center',
  },
});
