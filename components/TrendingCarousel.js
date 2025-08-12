import React, { useState, useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import trendingData from '../data/trendingData';

const { width } = Dimensions.get('window');

export default function TrendingCarousel({ onPressItem }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={trendingData}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onPressItem(item)}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.image}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.overlay}>
                <View style={styles.topRow}>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.stats}>{item.articles} articles</Text>
                  <Text style={styles.stats}>{item.reads} reads</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {trendingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  card: {
    width: width - 60,
    height: 180,
    marginRight: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  category: {
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 12,
    marginRight: 8,
  },
  stats: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: '#000',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#ccc',
  },
});
