import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    // ✅ Later: Add API call for reset password
    alert("Password reset link has been sent to your email");
    navigation.navigate("Login"); // redirect back to login
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="lock-closed-outline" size={48} color="green" />
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email to reset your password
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 40 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginTop: 10 },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4, textAlign: "center" },
  form: { width: "100%" },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "green",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  resetButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { color: "green", fontSize: 14, textAlign: "center", marginTop: 8 },
});
