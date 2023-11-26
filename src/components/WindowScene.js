import React, { useEffect, useRef } from 'react';
import { Animated, Image, View, StyleSheet, Dimensions } from 'react-native';

// Get the screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const maskHeight = SCREEN_HEIGHT * 0.25; // 30% of the screen height

const WindowScene = () => {
  const planeStartXPercentage = -4;
  const planeStartYPercentage = 0.5;
  const planeEndXPercentage = 1.2;
  const planeEndYPercentage = -0.1;

  const fadeAnimLeft = useRef(new Animated.Value(0)).current; //Controls window layers 0 and 1 - window exterior
  const sizeAnimLeft = useRef(new Animated.Value(0.5)).current;
  const fadeAnimRight = useRef(new Animated.Value(0)).current; //Controls window layer 2 - window pane
  const sizeAnimRight = useRef(new Animated.Value(0.5)).current;
  const fadeAnimLayer3 = useRef(new Animated.Value(0)).current; //Controls window layer 3 - furniture
  const scaleAnimLayer4 = useRef(new Animated.Value(0)).current; // Controls window layer 4 - departure board
  const fadeAnimCloudLeft = useRef(new Animated.Value(0)).current;
  const fadeAnimCloudRight = useRef(new Animated.Value(0)).current;
  const translateAnimCloudLeft = useRef(new Animated.Value(0)).current;
  const translateAnimCloudRight = useRef(new Animated.Value(0)).current;
  const planePosition = useRef(
    new Animated.ValueXY({ x: 0, y: maskHeight })
  ).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnimLeft, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }, 700);

    Animated.timing(sizeAnimLeft, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(sizeAnimRight, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnimRight, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(); // Start the second layer's animation immediately

    // Assume all other animations take 2 seconds to complete
    setTimeout(() => {
      // start the plane animation after all other animations have completed
      const planeAnimation = Animated.loop(
        Animated.timing(planePosition, {
          toValue: { x: SCREEN_WIDTH, y: 0 },
          duration: 4000, // 3 minutes in milliseconds
          useNativeDriver: true,
        })
      );

      // start the plane animation
      planeAnimation.start();
    }, 2000); // delay for 2 seconds

    setTimeout(() => {
      Animated.timing(fadeAnimLayer3, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 2000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimCloudLeft, {
          toValue: 1,
          duration: 3000,
          delay: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnimCloudLeft, {
          toValue: SCREEN_WIDTH,
          duration: 40000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimCloudLeft, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnimCloudLeft, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimCloudRight, {
          toValue: 1,
          duration: 3000,
          delay: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnimCloudRight, {
          toValue: SCREEN_WIDTH,
          duration: 70000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimCloudRight, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnimCloudRight, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    setTimeout(() => {
      Animated.sequence([
        Animated.timing(scaleAnimLayer4, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimLayer4, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3400);
  }, [
    fadeAnimLeft,
    sizeAnimLeft,
    fadeAnimRight,
    sizeAnimRight,
    fadeAnimLayer3,
    scaleAnimLayer4,
  ]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          ...styles.layer,
          opacity: fadeAnimLeft,
          transform: [{ scale: sizeAnimLeft }],
        }}
        source={require('../assets/images/ui/window-layer-0.png')}
        resizeMode="cover"
      />
      <Animated.Image
        style={{
          ...styles.layer,
          opacity: fadeAnimLeft,
          transform: [{ scale: sizeAnimLeft }],
        }}
        source={require('../assets/images/ui/window-layer-1.png')}
        resizeMode="cover"
      />

      <Animated.Image
        style={{
          ...styles.layer,
          opacity: fadeAnimCloudRight,
          transform: [{ translateX: translateAnimCloudRight }],
        }}
        source={require('../assets/images/ui/home-cloud-right.png')}
        resizeMode="cover"
      />
      <View style={{ ...styles.window }}>
        {/* <Image style={{
                ...styles.plane,
                }}
            source={require('../assets/images/ui/home-plane.png')}
            //resizeMode="cover"
            /> */}
        <View style={styles.redSquare}/>
        <Animated.Image
          style={{
            ...styles.plane,
            transform: planePosition.getTranslateTransform(),
          }}
          source={require('../assets/images/ui/home-plane.png')}
          //resizeMode="cover"
        />
      </View>
      <Animated.Image
        style={{
          ...styles.layer,
          opacity: fadeAnimRight,
          transform: [{ scale: sizeAnimRight }],
        }}
        source={require('../assets/images/ui/window-layer-2.png')}
        resizeMode="cover"
      />
      <Animated.Image
        style={{
          ...styles.layer,
          opacity: fadeAnimCloudLeft,
          transform: [{ translateX: translateAnimCloudLeft }],
        }}
        source={require('../assets/images/ui/home-cloud-left.png')}
        resizeMode="cover"
      />

      <Animated.Image
        style={{
          ...styles.layer,
          opacity: fadeAnimLayer3,
        }}
        source={require('../assets/images/ui/window-layer-3.png')}
        resizeMode="cover"
      />
      <Animated.Image
        style={{
          ...styles.layer,
          opacity: fadeAnimLayer3,
        }}
        source={require('../assets/images/ui/window-layer-3.png')}
        resizeMode="cover"
      />
      <Animated.Image
        style={{
          ...styles.layer,
          transform: [
            { translateX: SCREEN_WIDTH / 2 }, // Move the view to the right
            { translateY: -SCREEN_WIDTH / 2 }, // Move the view up
            { scale: scaleAnimLayer4 }, // Apply the scaling
            { translateX: -SCREEN_WIDTH / 2 },
            { translateY: SCREEN_WIDTH / 2 },
          ],
        }}
        source={require('../assets/images/ui/window-layer-4.png')}
        resizeMode="cover"
      />
    </View>
  );
};

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
  },
  window: {
    position: 'absolute',
    width: '100%',
    height: maskHeight, // Set the width to the screen width
  },
  plane: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  redSquare: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 20,
    height: 20,
    backgroundColor: 'red',
  }
});

export default WindowScene;
