import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import HeaderWithSearch from '../components/HeaderWithSearch';
import { fetchLatestPosts } from '../api/wpApi';

export default function DiscoverScreen({ navigation, route }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from WordPress
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const posts = await fetchLatestPosts(50); // Fetch latest 50 posts
        const formatted = posts.map((post) => ({
          uniqueId: `wp-${post.id}`,
          id: post.id,
          title: post.title.rendered,
          image:
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            'https://via.placeholder.com/100',
          category:
            post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
          author:
            post._embedded?.author?.[0]?.name || 'Unknown',
          content: post.content.rendered,
          date: new Date(post.date).toDateString(),
        }));
        setAllArticles(formatted);

        // Set category from HomeScreen if passed
        if (route.params?.category) {
          setSelectedCategory(route.params.category);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [route.params?.category]);

  // Compute unique categories
  const categories = useMemo(() => {
    const cats = allArticles.map((a) => a.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [allArticles]);

  // Filter articles by category & search
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchSearch = article.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchText, selectedCategory, allArticles]);

  const renderCategory = ({ item }) => (
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
        <Text style={styles.articleTitle} numberOfLines={2}>
          {item.title}
        </Text>
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
        keyExtractor={(_, index) => `cat-${index}`}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />

      {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading articles...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredArticles}
            keyExtractor={(item) => item.uniqueId}
            renderItem={renderArticle}
            contentContainerStyle={styles.articlesList}
            showsVerticalScrollIndicator={false}
          />
        )}

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
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
  },
  categoryButtonSelected: {
    backgroundColor: 'green',
  },
  categoryText: {
    color: '#555',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
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
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  loadingContainer: {
  flex: 1,
  justifyContent: 'flex-start', // start from top
  alignItems: 'center',
  paddingTop: 5,               // move down a bit from the top
},

});
