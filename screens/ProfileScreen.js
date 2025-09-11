import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: 'create-outline', title: 'Edit Profile', subtitle: 'Update your personal information' },
        { icon: 'log-out-outline', title: 'Logout', subtitle: 'Sign out from your account' },
        { icon: 'trash-outline', title: 'Delete Account', subtitle: 'Permanently remove your account' },
      ],
    },
    {
      title: 'Billing & Subscription',
      items: [
        { icon: 'card-outline', title: 'Card', subtitle: 'Manage your saved payment methods' },
        { icon: 'close-circle-outline', title: 'Cancel Billing', subtitle: 'Stop your active subscription' },
        { icon: 'receipt-outline', title: 'Subscription History', subtitle: 'View your past invoices' },
      ],
    },
    {
      title: 'About',
      items: [
        { icon: 'people-outline', title: 'About Us', subtitle: 'Learn more about our company' },
        { icon: 'call-outline', title: 'Contact Us', subtitle: 'Get in touch with our team' },
        { icon: 'information-circle-outline', title: 'App Info', subtitle: 'Version, build & details' },
      ],
    },
    {
      title: 'Legal & Policies',
      items: [
        { icon: 'lock-closed-outline', title: 'Privacy Policy', subtitle: 'How we handle your data' },
        { icon: 'document-text-outline', title: 'Terms and Condition', subtitle: 'Read our legal agreements' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {/* Left Column - Image */}
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.profileImage}
          />
        </View>

        {/* Right Column - Info */}
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>Charlotte King</Text>
          <Text style={styles.userEmail}>charlotte.king@example.com</Text>
        </View>
      </View>

      {/* Menu List */}
      <ScrollView style={styles.scroll}>
        {menuSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.menuItem}
                onPress={() => {
                  if (item.title === 'Card') 
                    {
                    navigation.navigate('Card');
                  } 
                  else if (item.title === 'Edit Profile') 
                    {
                    navigation.navigate('EditProfile');
                  } 
                  else if (item.title === 'Logout') 
                    {
                    navigation.navigate('Logout');
                  }  else if (item.title === 'Delete Account') {
                    navigation.navigate('DeleteAccount');
                  }
                  else if (item.title === 'Cancel Billing') {
                      navigation.navigate('CancelBilling');
                    }
                    else if (item.title === 'Subscription History') {
                      navigation.navigate('SubscriptionHistory');
                    }
                    else if (item.title === 'Privacy Policy') {
                      navigation.navigate('PrivacyPolicy');
                    }
                    else if (item.title === 'Terms and Condition') {
                      navigation.navigate('TermsAndConditions');
                    }
                    else if (item.title === 'About Us') {
                      navigation.navigate('AboutUs');
                    }
                    else if (item.title === 'Contact Us') {
                      navigation.navigate('ContactUs');
                    }
                    else if (item.title === 'App Info') {
                      navigation.navigate('AppInfo');
                    }

                  else 
                    {
                    console.log(`Navigate to ${item.title}`);
                  }
                }}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name={item.icon} size={20} color="green" style={styles.menuIcon} />
                  <View>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageWrapper: { position: 'relative', width: '35%', alignItems: 'center' },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 35,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 4,
  },
  profileInfo: { flex: 1, justifyContent: 'center', paddingLeft: 15 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 14, color: '#777', marginVertical: 6 },
  scroll: { paddingHorizontal: 20 },
  section: { marginTop: 25 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 12 },
  menuTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  menuSubtitle: { fontSize: 12, color: '#777' },
});
