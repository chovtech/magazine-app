import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CategoriesScroll() {
  const categories = ['For You', 'Technology', 'Business', 'Entertainment', 'Sports', 'Health', 'Travel'];
  const [activeCategory, setActiveCategory] = useState('For You');

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
  },
  activeCategoryButton: {
    backgroundColor: 'green', // light green background
  },
  activeCategoryText: {
    color: 'white', // white text for active category
    fontWeight: 'bold',
  },
});
