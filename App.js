import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { initDB } from "./api/db"; // ✅ import initDB

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function setup() {
      await initDB(); // ✅ make sure DB is ready
      setDbReady(true);
    }
    setup();
  }, []);

  if (!fontsLoaded || !dbReady) {
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

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
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
    backgroundColor: "#0E0316",
  },
  statusBarBackground: {
    height: StatusBar.currentHeight || 24,
    backgroundColor: "#0E0316",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0E0316",
  },
});
