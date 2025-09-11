import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderWithSearch from '../components/HeaderWithSearch'; // same header as other screens

// Placeholder saved articles (you’ll replace with real saved data)
const savedArticles = [
  {
    id: '1',
    title: 'How to Stay Productive While Working from Home',
    category: 'Productivity',
    author: 'Jane Doe',
    image: 'https://images.unsplash.com/photo-1587614382346-ac5ce068fe85?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'The Future of Renewable Energy in Africa',
    category: 'Environment',
    author: 'John Smith',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Top 10 Healthy Eating Tips',
    category: 'Health',
    author: 'Sarah Lee',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'Exploring the Wonders of Space Travel',
    category: 'Science',
    author: 'Mark Johnson',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Mastering the Art of Minimalism',
    category: 'Lifestyle',
    author: 'Emily Davis',
    image: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?w=800&h=600&fit=crop',
  },
];

export default function SaveScreen({ navigation }) {
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
      {/* Reusable header with screen title */}
      <HeaderWithSearch title="Saved" />

      <FlatList
        data={savedArticles}
        keyExtractor={(item) => item.id}
        renderItem={renderArticle}
        contentContainerStyle={styles.articlesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No saved articles yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
