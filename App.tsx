import React from 'react';
import { StatusBar } from 'react-native';
import RestaurantDiscoveryScreen from './src/screens/RestaurantDiscoveryScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <RestaurantDiscoveryScreen />
    </>
  );
}