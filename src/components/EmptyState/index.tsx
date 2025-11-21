import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRestaurantStore } from '../../store/restaurantStore';

interface EmptyStateProps {
  searchQuery?: string;
}

const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  const { resetFilters } = useRestaurantStore();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍔</Text>
      <Text style={styles.title}>No restaurants found</Text>
      <Text style={styles.description}>
        {searchQuery 
          ? `No results for "${searchQuery}"`
          : 'Try adjusting your filters or search for different cuisines'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={resetFilters}>
        <Text style={styles.buttonText}>Clear All Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmptyState;