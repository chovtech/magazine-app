import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HeaderWithSearch({ title }) {
  const navigation = useNavigation();
  const notificationCount = 3; // Can be dynamic later

  return (
    <View style={styles.container}>
      {/* Top Row: Profile - Title - Notification */}
      <View style={styles.topRow}>
        {/* Profile Image with navigation */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        {/* Notification Button */}
          <TouchableOpacity style={styles.notificationWrapper} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color="black" />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>




      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25, // to avoid notch
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  notificationWrapper: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 20,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
