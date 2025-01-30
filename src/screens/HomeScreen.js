import React from 'react';
import { View, Text } from 'react-native';
import { auth } from '../config/firebase'; // Correct the import path

const HomeScreen = () => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
};

export default HomeScreen;
