import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
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
});
