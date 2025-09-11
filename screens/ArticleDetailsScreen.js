// screens/ArticleDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ArticleDetailsScreen({ route, navigation }) {
  const { article } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail news</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {article?.title || 'Player New York Knicks heroics lead team to victory against rivals'}
      </Text>

      {/* Meta Info */}
      <View style={styles.metaRow}>
        <Text style={styles.category}>NBA Global Games</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.date}>Thu, 10 Nov 2023</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.readTime}>10 min read</Text>
      </View>

      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: article?.image || 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80' }}
          style={styles.image}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Trending</Text>
        </View>
      </View>

      {/* Author Row */}
      <View style={styles.authorRow}>
        <Image
          source={{ uri: article?.authorImage || 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.authorImage}
        />
        <View style={styles.authorInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.authorName}>{article?.author || 'John William Smith'}</Text>
            <Ionicons name="checkmark-circle" size={16} color="green" style={{ marginLeft: 4 }} />
          </View>
          <Text style={styles.followers}>20.9M Followers</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <Text style={styles.body}>
        {article?.content ||
          `The rivals tried to respond in the final moments of the game, but the Knicks’ defense held firm, denying them any opportunity to score. As the final buzzer sounded, the Madison Square Garden erupted in cheers as the Knicks celebrated their hard-fought victory.

In a thrilling match against their rivals, the New York Knicks secured a stunning victory with a final score of 112-108. The game, held at the Madison Square Garden, saw the Knicks’ star player shine.`}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    color: '#FF4500',
    fontWeight: '500',
  },
  dot: {
    marginHorizontal: 6,
    color: '#888',
  },
  date: {
    color: '#555',
  },
  readTime: {
    color: '#555',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    color: '#FF4500',
    fontWeight: '600',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
  },
  followers: {
    fontSize: 12,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#FF4500',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 30,
  },
});
