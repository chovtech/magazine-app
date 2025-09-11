import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactUsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Bar with Back & Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Contact Us</Text>
        <Ionicons name="mail-outline" size={26} color="#333" />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>
          Have questions or need support? Reach out to us:
        </Text>

        <Text style={styles.item}>
          📧 Email: support@example.com
        </Text>
        <Text style={styles.item}>
          ☎️ Phone: +234 800 123 4567
        </Text>
        <Text style={styles.item}>
          🏢 Address: 123 Example Street, Abuja, Nigeria
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
  text: { fontSize: 16, marginBottom: 15, color: '#444' },
  item: { fontSize: 15, marginBottom: 10, color: '#555' },
});
