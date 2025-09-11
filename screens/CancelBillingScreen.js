import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function CancelBillingScreen({ navigation }) {
  const handleCancelBilling = () => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel your billing plan? You may lose access to premium features.",
      [
        { text: "Keep Plan", style: "cancel" },
        { 
          text: "Cancel Plan", 
          style: "destructive",
          onPress: () => {
            console.log("Billing Cancelled");
            navigation.replace("Login"); // Or go back to Home
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cancel Billing</Text>
      <Text style={styles.subtitle}>
        Cancelling your billing will stop all future charges. You can re-subscribe anytime.
      </Text>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelBilling}>
        <Text style={styles.cancelText}>Cancel My Billing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#c00', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 30 },
  cancelButton: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
