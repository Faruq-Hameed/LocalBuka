import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRestaurantStore } from '../../store/restaurantStore';
import { getFilterLabel } from '../../utils/filterRestaurants';

const FilterChips = () => {
  const { filters, removeFilter } = useRestaurantStore();

  const activeChips: Array<{ type: keyof typeof filters; value: any; label: string }> = [];

  // Add cuisine chips
  filters.cuisine?.forEach(cuisine => {
    activeChips.push({ type: 'cuisine', value: cuisine, label: cuisine });
  });

  // Add price range chips
  filters.priceRange?.forEach(price => {
    activeChips.push({ 
      type: 'priceRange', 
      value: price, 
      label: getFilterLabel('priceRange', price) 
    });
  });

  // Add rating chip
  if (filters.minRating) {
    activeChips.push({
      type: 'minRating',
      value: filters.minRating,
      label: getFilterLabel('minRating', filters.minRating),
    });
  }

  // Add delivery time chip
  if (filters.maxDeliveryTime) {
    activeChips.push({
      type: 'maxDeliveryTime',
      value: filters.maxDeliveryTime,
      label: getFilterLabel('maxDeliveryTime', filters.maxDeliveryTime),
    });
  }

  // Add dietary options chips
  filters.dietaryOptions?.forEach(option => {
    activeChips.push({ type: 'dietaryOptions', value: option, label: option });
  });

  // Add open status chip
  if (filters.isOpen) {
    activeChips.push({
      type: 'isOpen',
      value: true,
      label: 'Open Now',
    });
  }

  if (activeChips.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeChips.map((chip, index) => (
          <TouchableOpacity
            key={`${chip.type}-${chip.value}-${index}`}
            style={styles.chip}
            onPress={() => removeFilter(chip.type, chip.value)}
          >
            <Text style={styles.chipText}>{chip.label}</Text>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3E2',
    borderRadius: 16,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  closeIcon: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
});

export default FilterChips;