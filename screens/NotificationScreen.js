// NotificationScreen.js
import React, { useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { NotificationContext } from "./NotificationContext"; // adjust path

export default function NotificationScreen({ navigation }) {
  const { notifications, saveNotifications } = useContext(NotificationContext);
  const responseListener = useRef();
  const receivedListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) console.log("Expo push token:", token);
    });

    // Foreground listener
    receivedListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body, data } = notification.request.content;
        const newItem = {
          id: `${Date.now()}`,
          title: title || data?.title || "Notification",
          body: body || "",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          data: data || {},
          read: false,
        };
        saveNotifications([newItem, ...notifications]);
      }
    );

    // Response listener
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const id = response.notification.request.identifier;
        markAsRead(id);
        const data = response.notification.request.content.data || {};
        if (data.articleId) {
          navigation.navigate("Article", { id: data.articleId });
        } else {
          navigation.navigate("NotificationDetail", {
            notification: response.notification.request.content,
          });
        }
      });

    return () => {
      if (receivedListener.current) receivedListener.current.remove();
      if (responseListener.current) responseListener.current.remove();
    };
  }, [notifications]);

  // --- CRUD actions ---
  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const toggleRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    );
    saveNotifications(updated);
  };

  const removeNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    saveNotifications(updated);
  };

  const clearAll = () => saveNotifications([]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
        <TouchableOpacity onPress={clearAll}>
          <Ionicons name="trash-outline" size={22} color="red" />
        </TouchableOpacity>
      </View>

      {/* Test button */}
      <TouchableOpacity
        onPress={async () => {
          await Notifications.scheduleNotificationAsync({
            content: { title: "Local Test 🚀", body: "This is a local test" },
            trigger: null,
          });
        }}
        style={styles.testButton}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Send Test Notification
        </Text>
      </TouchableOpacity>

      {/* Notification list */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            {!item.read && <View style={styles.unreadDot} />}
            <Ionicons
              name="alert-circle-outline"
              size={22}
              color="green"
              style={styles.icon}
            />

            <View style={styles.textWrapper}>
              <Text style={[styles.title, !item.read && styles.unreadTitle]}>
                {item.title}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
              {item.body ? (
                <Text style={{ color: "#444", marginTop: 4 }} numberOfLines={2}>
                  {item.body}
                </Text>
              ) : null}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Toggle Read/Unread */}
              <TouchableOpacity
                onPress={() => toggleRead(item.id)}
                style={{ marginRight: 10 }}
              >
                <Ionicons
                  name={item.read ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={item.read ? "#999" : "#4CAF50"}
                />
              </TouchableOpacity>

              {/* Open */}
              <TouchableOpacity
                onPress={() => {
                  markAsRead(item.id);
                  navigation.navigate("NotificationDetail", {
                    notification: item,
                  });
                }}
              >
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              {/* Delete */}
              <TouchableOpacity
                onPress={() => removeNotification(item.id)}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

// Permissions
async function registerForPushNotificationsAsync() {
  let token;
  if (!Device.isDevice) {
    Alert.alert("Physical device required", "Push requires real device.");
    return null;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    Alert.alert("Permission required", "Enable notifications in settings.");
    return null;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  return token;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  topBar: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { marginRight: 10 },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#333",
  },
  notificationItem: { flexDirection: "row", alignItems: "center", padding: 12 },
  icon: { marginRight: 12 },
  textWrapper: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#222" },
  unreadTitle: { fontWeight: "bold", color: "#000" },
  time: { fontSize: 12, color: "#666", marginTop: 3 },
  separator: { height: 1, backgroundColor: "#eee", marginVertical: 4 },
  testButton: {
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    marginBottom: 15,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "green",
    marginRight: 6,
  },
});
