// screens/NotificationContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Load saved notifications from storage
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("notifications");
      if (stored) setNotifications(JSON.parse(stored));
    })();
  }, []);

  // Save to storage whenever notifications change
  const saveNotifications = async (newList) => {
    setNotifications(newList);
    await AsyncStorage.setItem("notifications", JSON.stringify(newList));
  };

  return (
    <NotificationContext.Provider value={{ notifications, saveNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
