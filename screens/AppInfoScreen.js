import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppInfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Bar with Back & Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>App Info</Text>
        <Ionicons name="apps-outline" size={26} color="#333" />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>MyApp</Text>
        <Text style={styles.version}>Version: 1.0.0</Text>
        <Text style={styles.paragraph}>
          MyApp is designed to provide a seamless reading and discovery experience.
          Explore articles, save your favorites, and manage your profile all in one place.
        </Text>
        <Text style={styles.paragraph}>
          Built with ❤️ using React Native.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backButton: { marginRight: 10 },
  header: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center', color: '#333' },
  content: { marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#111', marginBottom: 8 },
  version: { fontSize: 16, color: '#666', marginBottom: 15 },
  paragraph: { fontSize: 15, color: '#444', marginBottom: 12, lineHeight: 22 },
});
