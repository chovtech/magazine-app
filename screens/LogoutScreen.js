import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LogoutScreen({ navigation }) {
  const handleLogout = () => {
    // TODO: Clear auth state, tokens, etc.
    console.log("User logged out");
    navigation.replace("Login"); // Replace with your login screen name
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Logout</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Ionicons name="log-out-outline" size={80} color="green" style={{ marginBottom: 20 }} />
        <Text style={styles.title}>Are you sure you want to logout?</Text>
        <Text style={styles.subtitle}>You will need to log in again to access your account.</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15, color: '#333' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#777', textAlign: 'center', marginBottom: 30 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  button: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  cancelButton: { backgroundColor: '#ddd' },
  logoutButton: { backgroundColor: 'green' },
  cancelText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
