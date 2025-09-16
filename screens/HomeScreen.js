import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import HeaderWithSearch from "../components/HeaderWithSearch";
import TrendingCarousel from "../components/TrendingCarousel";
import RecommendedList from "../components/RecommendedList";
import { getPosts } from "../api/db";
import { refreshPostsInBackground } from "../api/wpApi";

export default function HomeScreen({ navigation }) {
  const [recommendedData, setRecommendedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load posts from DB
  const loadFromDB = async () => {
    try {
      setLoading(true);
      const cachedPosts = await getPosts(10);
      setRecommendedData(cachedPosts);
    } catch (error) {
      console.error("Error loading from DB:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load + background refresh
  useEffect(() => {
    loadFromDB();
    refreshPostsInBackground(10).then(() => {
      loadFromDB();
    });
  }, []);

  // Pull-to-refresh handler
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refreshPostsInBackground(10);
      await loadFromDB();
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePressItem = (item) => {
    navigation.navigate("ArticleDetails", { article: item });
  };

  const renderHeader = () => (
    <>
      <HeaderWithSearch title="Home" />
      <TrendingCarousel onPressItem={handlePressItem} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="green" />
          <Text style={styles.loadingText}>Loading articles...</Text>
        </View>
      ) : (
        <RecommendedList
          data={recommendedData}
          onSeeMore={() => navigation.navigate("DiscoverScreen")}
          onPressItem={handlePressItem}
        />
      )}
    </>
  );

  return (
    <FlatList
      data={[{ key: "home-header" }]} // dummy item to render header
      ListHeaderComponent={renderHeader}
      keyExtractor={(item) => item.key}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 6,
    fontSize: 14,
    color: "#888",
  },
});
