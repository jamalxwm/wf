import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../components/Background'; 
import WindowScene from '../components/WindowScene';
export default HomeScreen = () => (
  <Background>
    <View style={styles.container}>
      <WindowScene/>
    </View>
  </Background>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff', // Feel free to change this color to make the text visible against your background
  },
});


