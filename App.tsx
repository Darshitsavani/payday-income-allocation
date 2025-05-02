import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Dashboard from './screens/Dashboard';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});