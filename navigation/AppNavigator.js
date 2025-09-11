import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SaveScreen from '../screens/SaveScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArticleDetailsScreen from '../screens/ArticleDetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CardScreen from "../screens/CardScreen";
import LogoutScreen from "../screens/LogoutScreen"; // adjust path
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import CancelBillingScreen from "../screens/CancelBillingScreen";
import SubscriptionHistoryScreen from "../screens/SubscriptionHistoryScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import AboutUsScreen from "../screens/AboutUsScreen"; 
import ContactUsScreen from "../screens/ContactUsScreen";
import AppInfoScreen from "../screens/AppInfoScreen";
import NotificationScreen from "../screens/NotificationScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 80 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Save') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Save" component={SaveScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />   
        <Stack.Screen name="Card" component={CardScreen} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
        <Stack.Screen name="CancelBilling" component={CancelBillingScreen} />
        <Stack.Screen name="SubscriptionHistory" component={SubscriptionHistoryScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="AppInfo" component={AppInfoScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
