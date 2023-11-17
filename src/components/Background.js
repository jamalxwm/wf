import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const backgroundImage = require('../assets/images/backgrounds/app-background-dark.png');

const Background = ({ children }) => (
  <ImageBackground
    source={backgroundImage}
    style={styles.background}
    resizeMode="cover"
  >
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
});

export default Background;
