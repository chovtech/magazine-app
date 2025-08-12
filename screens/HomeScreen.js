import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeaderWithSearch from '../components/HeaderWithSearch';
import CategoriesScroll from '../components/CategoriesScroll';
import TrendingCarousel from '../components/TrendingCarousel';
import RecommendedList from '../components/RecommendedList';
import recommendedData from '../data/recommendedData'; // import recommended data here

export default function HomeScreen({ navigation }) {
  const handlePressItem = (item) => {
    navigation.navigate('ArticleDetails', { article: item });
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderWithSearch />
      <CategoriesScroll />
      <TrendingCarousel onPressItem={handlePressItem} />
      <RecommendedList
        data={recommendedData}               // pass recommendedData here
        onSeeMore={() => navigation.navigate('Articles')}
        onPressItem={handlePressItem}        // pass handler here too
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
