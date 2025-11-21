// src/components/RestaurantGrid/index.tsx

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import RestaurantCard from '../RestaurantCard';
import EmptyState from '../EmptyState';
import { Restaurant } from '../../types/restaurant.types';
import { useRestaurantStore } from '../../store/restaurantStore';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  onLoadMore: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
}

const RestaurantGrid = ({
  restaurants,
  onLoadMore,
  onRefresh,
  isRefreshing,
  isLoadingMore,
  hasMore,
}: RestaurantGridProps) => {
  const { searchQuery, sortBy } = useRestaurantStore();

  // Results header
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.resultsText}>
        {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} found
      </Text>
      <Text style={styles.sortText}>Sort by: {getSortLabel(sortBy)}</Text>
    </View>
  );

  // Footer loader
  const renderFooter = () => {
    if (!isLoadingMore || !hasMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#FF6B35" />
      </View>
    );
  };

  // Empty state
  if (restaurants.length === 0 && !isRefreshing) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={restaurants}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#FF6B35']}
            tintColor="#FF6B35"
          />
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const getSortLabel = (sortBy: string) => {
  switch (sortBy) {
    case 'rating':
      return 'Highest Rated';
    case 'deliveryTime':
      return 'Fastest Delivery';
    case 'price':
      return 'Price: Low to High';
    case 'popular':
    default:
      return 'Popular';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  sortText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default RestaurantGrid;