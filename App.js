// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // load Ionicons font (used by bottom tabs)
  const [fontsLoaded] = useFonts(Ionicons.font);

  // While loading, show a simple spinner inside the same wrappers
  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
          <View style={styles.statusBarBackground} />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
          <StatusBar style="light" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  }

  // when fonts are ready, render the real app
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        {/* This View is the background for the status bar */}
        <View style={styles.statusBarBackground} />

        <AppNavigator />

        <StatusBar style="light" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0316', // app background
  },
  statusBarBackground: {
    height: StatusBar.currentHeight || 24, // status bar height for Android
    backgroundColor: '#0E0316', // your theme color
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E0316',
  },
});
