import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen({ navigation }) {
  const [username] = useState('charlotte_king'); // fixed, not editable
  const [name, setName] = useState('Charlotte King');
  const [email, setEmail] = useState('charlotte.king@example.com');
  const [phone, setPhone] = useState('+1 234 567 890');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Updated:', { username, name, email, phone, password });
    navigation.goBack(); // Go back after saving
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
          </View>

          {/* Profile Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View style={styles.form}>
            

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter new password"
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Re-enter new password"
            />
          </View>
        </ScrollView>

        {/* Fixed Save Button at Bottom */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40, // extra padding so inputs don’t hide behind button
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    marginRight: 10,
    padding: 5,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  imageWrapper: { 
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',  
    width: 120,
    height: 120,
  },

  profileImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 60,
  },

  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 6,             
    borderWidth: 2,         
    borderColor: '#fff',
  },

  form: { marginTop: 10 },

  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginTop: 15, 
    color: '#333' 
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    fontSize: 16,
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  saveButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  saveText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});
