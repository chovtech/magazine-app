import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationScreen({ navigation }) {
  // Example notifications — can be fetched from API later
  const notifications = [
    { id: '1', title: 'New article available!', time: '2h ago' },
    { id: '2', title: 'Subscription renewed successfully.', time: '1d ago' },
    { id: '3', title: 'Password changed successfully.', time: '3d ago' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </View>

      {/* List of Notifications */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Ionicons name="alert-circle-outline" size={22} color="green" style={styles.icon} />
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { marginRight: 10 },
  header: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center', color: '#333' },
  notificationItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  icon: { marginRight: 12 },
  textWrapper: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#222' },
  time: { fontSize: 12, color: '#666', marginTop: 3 },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 4 },
});
