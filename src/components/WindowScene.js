import React, { useEffect, useRef } from 'react';
import { Animated, Image, View, StyleSheet, Dimensions } from 'react-native';

// Get the full width of the screen
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const WindowScene = () => {
  const fadeAnimLayer1 = useRef(new Animated.Value(0)).current; //Window background layer
  const sizeAnimLayer1 = useRef(new Animated.Value(0.5)).current;
  const fadeAnimLayer2 = useRef(new Animated.Value(0)).current; //Window Pane layer
  const sizeAnimLayer2 = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnimLayer1, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 500);
  
    Animated.timing(sizeAnimLayer1, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(sizeAnimLayer2, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
  
    Animated.timing(fadeAnimLayer2, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(); // Start the second layer's animation immediately
  }, [fadeAnimLayer1, sizeAnimLayer1, fadeAnimLayer2, sizeAnimLayer2]);

  return (
    <View style={styles.container}>
        
      <Animated.Image
        style={{
          ...styles.layer,
          opacity: fadeAnimLayer1,
          transform: [{ scale: sizeAnimLayer1 }],
        }}
        source={require('../assets/images/ui/temp-window-scene.png')}
        resizeMode="cover"
      />
      <Animated.Image
        style={{
          ...styles.layer2,
          opacity: fadeAnimLayer2,
          transform: [{ scale: sizeAnimLayer2 }],
        }}
        source={require('../assets/images/ui/home-window-panes.png')}
        //resizeMode="cover"
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
  layer2: {
    position: 'absolute',
  }
});

export default WindowScene;
