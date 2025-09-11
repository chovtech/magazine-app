import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Header with Back Arrow + Privacy Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.header}>Privacy Policy</Text>

        <Ionicons name="shield-checkmark-outline" size={24} color="#333" />
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.paragraph}>
          Welcome to our Privacy Policy page. Your privacy is important to us.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We may collect personal information such as your name, email address,
          phone number, and payment details when you use our services.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information to provide and improve our services, process
          payments, and communicate with you regarding updates and offers.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement strict security measures to protect your information from
          unauthorized access, disclosure, or misuse.
        </Text>

        <Text style={styles.sectionTitle}>4. Sharing of Information</Text>
        <Text style={styles.paragraph}>
          We do not sell or rent your personal data. We may share information
          only with trusted third-party service providers as necessary.
        </Text>

        <Text style={styles.sectionTitle}>5. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          We may update this policy from time to time. Any changes will be
          posted on this page with an updated revision date.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions about this Privacy Policy, please contact us at
          support@example.com.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 10 },
  topBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  backButton: { padding: 5 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 15, color: '#222' },
  paragraph: { fontSize: 14, lineHeight: 22, color: '#555', marginTop: 6 },
});
