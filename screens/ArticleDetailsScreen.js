import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import { updateSaveStatus, getPostById } from "../api/db"; // import your DB functions

export default function ArticleDetailsScreen({ route, navigation }) {
  const { article } = route.params || {};
  const { width } = useWindowDimensions();
  const [isSaved, setIsSaved] = useState(false);

  // Load current saved status from DB
  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!article?.id) return;
      try {
        const post = await getPostById(article.id);
        setIsSaved(post?.saved === 1);
      } catch (err) {
        console.error("Failed to fetch save status:", err);
      }
    };
    fetchSavedStatus();
  }, [article]);

  // Toggle save status
  const toggleSave = async () => {
    if (!article?.id) return;
    try {
      const newStatus = !isSaved;
      await updateSaveStatus(article.id, newStatus);
      setIsSaved(newStatus);
      Alert.alert(newStatus ? 'Saved' : 'Removed', `Article has been ${newStatus ? 'saved' : 'removed'} successfully.`);
    } catch (err) {
      console.error("Failed to update save status:", err);
    }
  };

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
      <Text style={styles.title}>{article?.title || 'Untitled Post'}</Text>

      {/* Meta Info */}
      <View style={styles.metaRow}>
        <Text style={styles.category}>{article?.category || 'General'}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.date}>{article?.date || 'Unknown Date'}</Text>
      </View>

      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              article?.image ||
              'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
          }}
          style={styles.image}
        />
      </View>

      {/* Author Row + Save Icon */}
      <View style={styles.authorRow}>
        <Image
          source={{ uri: article?.authorImage || 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.authorImage}
        />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{article?.author || 'Unknown Author'}</Text>
          <Text style={styles.followers}>Contributor</Text>
        </View>

        {/* Save Icon */}
        <TouchableOpacity onPress={toggleSave}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isSaved ? '#FF4500' : '#333'}
          />
        </TouchableOpacity>
      </View>

      {/* Body (Render HTML) */}
      {article?.content ? (
        <RenderHTML
          contentWidth={width}
          source={{ html: article.content }}
          tagsStyles={{
            p: { fontSize: 15, lineHeight: 22, color: '#333', marginBottom: 12 },
            h2: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
            img: { borderRadius: 8, marginVertical: 10 },
          }}
        />
      ) : (
        <Text style={styles.body}>No content available.</Text>
      )}
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
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
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
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 30,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between', // ensures Save icon is on the right
  },
  authorInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
});
