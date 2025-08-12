import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SaveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saved Articles</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: '#fff', fontSize: 20 },
});
