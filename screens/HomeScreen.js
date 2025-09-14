import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeaderWithSearch from '../components/HeaderWithSearch';
import CategoriesScroll from '../components/CategoriesScroll';
import TrendingCarousel from '../components/TrendingCarousel';
import RecommendedList from '../components/RecommendedList';
import { fetchLatestPosts } from '../api/wpApi'; // ✅

export default function HomeScreen({ navigation }) {
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {
  const loadRecommended = async () => {
    try {
      const posts = await fetchLatestPosts(10); // latest posts
      const formatted = posts.map((post) => ({
        id: post.id,
        title: post.title.rendered,
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/100',
        category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
        author: post._embedded?.author?.[0]?.name || 'Unknown',
        authorImage: post._embedded?.author?.[0]?.avatar_urls?.['24'] || 'https://via.placeholder.com/24',
        date: new Date(post.date).toDateString(),
        content: post.content.rendered,
      }));
      setRecommendedData(formatted);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  loadRecommended();
}, []);

  const handlePressItem = (item) => {
    navigation.navigate('ArticleDetails', { article: item });
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderWithSearch title="Home" />
      {/* <CategoriesScroll /> */}
      <TrendingCarousel onPressItem={handlePressItem} />
      <RecommendedList
        data={recommendedData}
        onSeeMore={() => navigation.navigate('DiscoverScreen')}
        onPressItem={handlePressItem}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
