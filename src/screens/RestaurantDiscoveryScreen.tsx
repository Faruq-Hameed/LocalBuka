import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import SearchHeader from '../components/SearchHeader';
import FilterChips from '../components/FilterChips';
import RestaurantGrid from '../components/RestaurantGrid';
import FilterModal from '../components/FilterModal';
import { useRestaurantSearch } from '../hooks/useRestaurantSearch';
import { useInfiniteRestaurants } from '../hooks/useInfiniteRestaurants';
import { ALL_MOCK_RESTAURANTS } from '../utils/mockData';

const RestaurantDiscoveryScreen = () => {
  // Get filtered restaurants
  const { restaurants: filteredRestaurants } = useRestaurantSearch(ALL_MOCK_RESTAURANTS);

  // Handle pagination
  const {
    displayedRestaurants,
    loadMore,
    refresh,
    hasMore,
    isLoadingMore,
    isRefreshing,
  } = useInfiniteRestaurants(filteredRestaurants);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Search Header */}
        <SearchHeader />

        {/* Active Filter Chips */}
        <FilterChips />

        {/* Restaurant List */}
        <RestaurantGrid
          restaurants={displayedRestaurants}
          onLoadMore={loadMore}
          onRefresh={refresh}
          isRefreshing={isRefreshing}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
        />

        {/* Filter Modal */}
        <FilterModal />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});

export default RestaurantDiscoveryScreen;