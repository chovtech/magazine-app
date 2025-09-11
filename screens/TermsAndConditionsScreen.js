import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TermsAndConditionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Header with Back Arrow + Legal Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.header}>Terms & Conditions</Text>

        <Ionicons name="document-text-outline" size={24} color="#333" />
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.paragraph}>
          Welcome to our Terms & Conditions page. Please read these carefully
          before using our services.
        </Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using our services, you agree to be bound by these
          Terms & Conditions and our Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of Services</Text>
        <Text style={styles.paragraph}>
          You agree to use our services only for lawful purposes and in a manner
          that does not infringe on the rights of others.
        </Text>

        <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          You are responsible for maintaining the confidentiality of your
          account information and for all activities under your account.
        </Text>

        <Text style={styles.sectionTitle}>4. Payments & Subscriptions</Text>
        <Text style={styles.paragraph}>
          All payments are final and non-refundable unless stated otherwise in
          our refund policy.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          We are not liable for any damages resulting from the use or inability
          to use our services, to the fullest extent permitted by law.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify or update these Terms at any time. Any
          changes will be posted on this page with an updated revision date.
        </Text>

        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions regarding these Terms & Conditions, please
          contact us at support@example.com.
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
