import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AboutUsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>About Us</Text>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.paragraph}>
          Welcome to our app! We are passionate about creating solutions that make your
          life easier and more productive.
        </Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          Our mission is to deliver high-quality digital experiences that empower users
          to achieve more every day.
        </Text>

        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.paragraph}>
          We envision a world where technology seamlessly integrates into daily life,
          enhancing both personal and professional growth.
        </Text>

        <Text style={styles.sectionTitle}>Get in Touch</Text>
        <Text style={styles.paragraph}>
          If you’d like to connect with us, feel free to reach out via
          support@example.com. We’d love to hear from you!
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { marginRight: 10 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 15, color: '#222' },
  paragraph: { fontSize: 14, lineHeight: 22, color: '#555', marginTop: 6 },
});
