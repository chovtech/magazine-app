import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchMembership, getStoredMembership } from "../utils/membershipService";

export default function PaymentScreen({ navigation }) {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let data = await fetchMembership(); // fetch from backend
      if (!data) data = await getStoredMembership(); // fallback to local storage
      setMembership(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2a5298" />
      </View>
    );
  }

  // ------------------- Membership Status Logic -------------------
  const now = new Date();
  let statusText = "No active plan";
  let planTitle = membership?.level_name || "Free";

  // Free plan
  if (membership?.level_id === 1) {
    planTitle = "Free";
    statusText = "Free plan";
  }

  // Premium plan
  if (membership?.level_id === 2) {
    planTitle = membership?.level_name || "Premium";
    if (!membership?.enddate) {
      statusText = "No active subscription";
    } else {
      const expiry = new Date(membership.enddate);
      statusText =
        expiry > now
          ? `Active (expires on ${expiry.toDateString()})`
          : `Expired on ${expiry.toDateString()}`;
    }
  }

  // ------------------- Action Button Label -------------------
  const actionLabel =
    membership?.level_id === 2 &&
    membership?.enddate &&
    new Date(membership.enddate) > now
      ? "Renew Plan"
      : "Subscribe";

  // ----------------------------------------------------------------
  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Subscription</Text>
        <Ionicons name="newspaper-outline" size={28} color="#333" />
      </View>

      {/* Subscription Box */}
      <View style={styles.card}>
        <Text style={styles.planTitle}>{planTitle}</Text>
        <Text style={styles.status}>{statusText}</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => alert("Trigger IAP flow")}
      >
        <Text style={styles.actionText}>{actionLabel}</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Purchases are secure via App Store / Play Store.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#F8F9FA", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#222" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  planTitle: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 10 },
  status: { fontSize: 14, color: "#666" },
  actionButton: {
    backgroundColor: "#2a5298",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  note: { fontSize: 12, color: "#777", marginTop: 15, textAlign: "center" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
