import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import HeaderWithSearch from "../components/HeaderWithSearch";
import { getPosts } from "../api/db";
import { refreshPostsInBackground } from "../api/wpApi";

export default function DiscoverScreen({ navigation, route }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // <-- new: pull-to-refresh state
  const [refreshing, setRefreshing] = useState(false);

  // Helper: load from local DB and format
  const loadFromDB = async () => {
    try {
      setLoading(true);
      const cachedPosts = await getPosts(50);
      const formatted = cachedPosts.map((post) => ({
        uniqueId: `db-${post.id}`,
        id: post.id,
        title: post.title,
        image: post.image || "https://via.placeholder.com/100",
        category: post.category || "General",
        author: post.author || "Unknown",
        content: post.content,
        date: post.date ? new Date(post.date).toDateString() : "",
      }));
      setAllArticles(formatted);

      if (route.params?.category) {
        setSelectedCategory(route.params.category);
      }
    } catch (error) {
      console.error("Error loading from DB:", error);
    } finally {
      setLoading(false);
    }
  };

  // initial load + background refresh
  useEffect(() => {
    loadFromDB();

    // background refresh then reload DB
    refreshPostsInBackground(50).then(() => {
      loadFromDB();
    });
  }, [route.params?.category]);

  // Pull-to-refresh handler
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // this waits until posts are saved into SQLite
      await refreshPostsInBackground(50);
      // reload from DB to get the saved posts
      await loadFromDB();
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // Compute categories
  const categories = useMemo(() => {
    const cats = allArticles.map((a) => a.category);
    return ["All", ...Array.from(new Set(cats))];
  }, [allArticles]);

  // Filter articles by category & search
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchCategory =
        selectedCategory === "All" || article.category === selectedCategory;
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
      onPress={() => navigation.navigate("ArticleDetails", { article: item })}
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
          <ActivityIndicator size="small" />
          <Text style={styles.loadingText}>Loading articles...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.uniqueId}
          renderItem={renderArticle}
          contentContainerStyle={styles.articlesList}
          showsVerticalScrollIndicator={false}
          // <-- pull-to-refresh props
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchInput: {
    height: 40,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
  },
  categoriesList: { paddingHorizontal: 12, marginBottom: 10 },
  categoryButton: {
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
  },
  categoryButtonSelected: { backgroundColor: "green" },
  categoryText: { color: "#555", fontWeight: "500", fontSize: 14 },
  categoryTextSelected: { color: "#fff" },
  articlesList: { paddingHorizontal: 12, paddingBottom: 40 },
  articleCard: {
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  articleImage: { width: 100, height: 100 },
  articleInfo: { flex: 1, padding: 12, justifyContent: "center" },
  articleCategory: { fontSize: 12, color: "green", marginBottom: 4, fontWeight: "600" },
  articleTitle: { fontSize: 16, fontWeight: "700", color: "#222" },
  articleAuthor: { marginTop: 6, fontSize: 12, color: "#666" },
  loadingText: { textAlign: "center", marginTop: 6, fontSize: 14, color: "#888" },
  loadingContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 5,
  },
});
