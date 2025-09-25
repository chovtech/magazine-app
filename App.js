// App.js
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { initDB } from "./api/db";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants"; // ✅ needed for version check
import { NotificationProvider } from "./screens/NotificationContext";
import UpdateModal from "./screens/UpdateModal"; // ✅ reuse UpdateModal

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [dbReady, setDbReady] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [updateUrl, setUpdateUrl] = useState("");

  useEffect(() => {
    async function setup() {
      await initDB();
      setDbReady(true);
    }
    setup();

    // ✅ Version check
    const checkVersion = async () => {
      try {
        const response = await fetch("https://contemporaryworld.ipcr.gov.ng/wp-json/app-update/v1/version"); // replace with your endpoint
        const data = await response.json();
        const latestVersion = data.latestVersion;
        const storeUrl = data.url;

        if (Constants.expoConfig.version !== latestVersion) {
          setUpdateUrl(storeUrl);
          setForceUpdate(true);
        }
      } catch (error) {
        console.log("Version check failed", error);
      }
    };

    checkVersion();
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

        {/* 🚨 Force Update Modal (blocks everything else) */}
        <UpdateModal visible={forceUpdate} updateUrl={updateUrl} />

        <NotificationProvider>
          <AppNavigator />
        </NotificationProvider>
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0E0316" },
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
