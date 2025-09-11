import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function DeleteAccountScreen({ navigation }) {
  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            console.log("Account Deleted");
            navigation.replace("Login"); // redirect to login or onboarding
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.subtitle}>
        Deleting your account will remove all your data permanently. This cannot be undone.
      </Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete My Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#c00', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 30 },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
