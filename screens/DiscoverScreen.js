import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import HeaderWithSearch from '../components/HeaderWithSearch'; // Your header component
import trendingData from '../data/trendingData';
import recommendedData from '../data/recommendedData';

// Assign unique IDs to avoid key duplication
const allArticles = [
  ...trendingData.map((item) => ({ ...item, uniqueId: `tr-${item.id}` })),
  ...recommendedData.map((item) => ({ ...item, uniqueId: `rec-${item.id}` })),
];

export default function DiscoverScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = allArticles.map((a) => a.category);
    return ['All', ...Array.from(new Set(cats))];
  }, []);

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchSearch = article.title.toLowerCase().includes(searchText.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchText, selectedCategory]);

  const renderCategory = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        item === selectedCategory && styles.categoryButtonSelected,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          item === selectedCategory && styles.categoryTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderArticle = ({ item }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => navigation.navigate('ArticleDetails', { article: item })}
    >
      <Image source={{ uri: item.image }} style={styles.articleImage} />
      <View style={styles.articleInfo}>
        <Text style={styles.articleCategory}>{item.category}</Text>
        <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
        {item.author && <Text style={styles.articleAuthor}>By {item.author}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderWithSearch title="Discover" />

      <TextInput
        style={styles.searchInput}
        placeholder="Search articles..."
        value={searchText}
        onChangeText={setSearchText}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(_, index) => `cat-${index}`} // use index as key for categories
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />

      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.uniqueId}
        renderItem={renderArticle}
        contentContainerStyle={styles.articlesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
  },
  categoriesList: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  categoryButton: {
  backgroundColor: '#eee',
  paddingHorizontal: 16,   // slightly wider for better tap area
  paddingVertical: 6,      // reduce vertical padding to prevent clipping
  borderRadius: 20,
  marginHorizontal: 6,
  justifyContent: 'center',  // center text vertically
  alignItems: 'center',      // center text horizontally
  height: 36,                // fixed height prevents stretching
},
categoryButtonSelected: {
  backgroundColor: 'green',
  // no extra padding or margin here to keep height consistent
},
categoryText: {
  color: '#555',
  fontWeight: '500',
  fontSize: 14,          // slightly bigger for readability
  lineHeight: 18,        // line height to match font size
  textAlign: 'center',
},
categoryTextSelected: {
  color: '#fff',
},
  articlesList: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  articleCard: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  articleImage: {
    width: 100,
    height: 100,
  },
  articleInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  articleCategory: {
    fontSize: 12,
    color: 'green',
    marginBottom: 4,
    fontWeight: '600',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  articleAuthor: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
});
