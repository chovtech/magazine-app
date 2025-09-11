import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CardScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Card</Text>
          <Ionicons name="card-outline" size={28} color="#333" />
        </View>

        {/* Virtual Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>VISA</Text>
          <Text style={styles.cardNumber}>**** **** **** 1234</Text>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.label}>Card Holder</Text>
              <Text style={styles.value}>Chike Okoli</Text>
            </View>
            <View>
              <Text style={styles.label}>Expiry</Text>
              <Text style={styles.value}>08/28</Text>
            </View>
          </View>
        </View>

        {/* Balance Section */}
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>₦245,000.00</Text>
        </View>

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transaction}>
          <Ionicons name="arrow-up-circle-outline" size={24} color="red" />
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Transfer to John</Text>
            <Text style={styles.transactionDate}>Aug 14, 2025</Text>
          </View>
          <Text style={styles.transactionAmount}>- ₦15,000</Text>
        </View>

        <View style={styles.transaction}>
          <Ionicons name="arrow-down-circle-outline" size={24} color="green" />
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Salary</Text>
            <Text style={styles.transactionDate}>Aug 12, 2025</Text>
          </View>
          <Text style={styles.transactionAmount}>+ ₦120,000</Text>
        </View>

        <View style={styles.transaction}>
          <Ionicons name="cart-outline" size={24} color="#333" />
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Shopping</Text>
            <Text style={styles.transactionDate}>Aug 10, 2025</Text>
          </View>
          <Text style={styles.transactionAmount}>- ₦8,500</Text>
        </View>
      </ScrollView>

      {/* Floating Add Card Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => alert("Add Card Pressed!")}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  card: {
    backgroundColor: "#2a5298", // fallback solid color
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 22,
    letterSpacing: 2,
    color: "#fff",
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    color: "#ddd",
  },
  value: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  balanceBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#777",
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  transactionDate: {
    fontSize: 12,
    color: "#777",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#2a5298",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
});
