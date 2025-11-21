// src/components/FilterModal/index.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRestaurantStore } from '../../store/restaurantStore';
import {
  CUISINE_OPTIONS,
  PRICE_RANGES,
  RATING_OPTIONS,
  DIETARY_OPTIONS,
} from '../../constants/filters';

const FilterModal = () => {
  const {
    isFilterModalVisible,
    setFilterModalVisible,
    filters,
    setFilters,
    resetFilters,
  } = useRestaurantStore();

  const [localFilters, setLocalFilters] = useState(filters);

  const handleClose = () => {
    setFilterModalVisible(false);
    setLocalFilters(filters); // Reset to current filters
  };

  const handleApply = () => {
    setFilters(localFilters);
    setFilterModalVisible(false);
  };

  const handleReset = () => {
    setLocalFilters({
      cuisine: [],
      priceRange: [],
      minRating: undefined,
      maxDeliveryTime: undefined,
      dietaryOptions: [],
      isOpen: undefined,
    });
  };

  // Toggle helpers
  const toggleCuisine = (cuisine: string) => {
    const current = localFilters.cuisine || [];
    const updated = current.includes(cuisine)
      ? current.filter(c => c !== cuisine)
      : [...current, cuisine];
    setLocalFilters({ ...localFilters, cuisine: updated });
  };

  const togglePriceRange = (price: 1 | 2 | 3 | 4) => {
    const current = localFilters.priceRange || [];
    const updated = current.includes(price)
      ? current.filter(p => p !== price)
      : [...current, price];
    setLocalFilters({ ...localFilters, priceRange: updated });
  };

  const toggleDietaryOption = (option: string) => {
    const current = localFilters.dietaryOptions || [];
    const updated = current.includes(option)
      ? current.filter(o => o !== option)
      : [...current, option];
    setLocalFilters({ ...localFilters, dietaryOptions: updated });
  };

  return (
    <Modal
      visible={isFilterModalVisible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetText}>Reset All</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Cuisine Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuisine Type</Text>
            <View style={styles.chipGrid}>
              {CUISINE_OPTIONS.map(cuisine => {
                const isSelected = localFilters.cuisine?.includes(cuisine);
                return (
                  <TouchableOpacity
                    key={cuisine}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => toggleCuisine(cuisine)}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {cuisine}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceGrid}>
              {PRICE_RANGES.map(price => {
                const isSelected = localFilters.priceRange?.includes(price.value);
                return (
                  <TouchableOpacity
                    key={price.value}
                    style={[styles.priceCard, isSelected && styles.priceCardSelected]}
                    onPress={() => togglePriceRange(price.value)}
                  >
                    <Text style={[styles.priceLabel, isSelected && styles.priceLabelSelected]}>
                      {price.label}
                    </Text>
                    <Text style={[styles.priceDesc, isSelected && styles.priceDescSelected]}>
                      {price.description}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Minimum Rating */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Minimum Rating</Text>
            <View style={styles.ratingRow}>
              {RATING_OPTIONS.map(rating => {
                const isSelected = localFilters.minRating === rating.value;
                return (
                  <TouchableOpacity
                    key={rating.value}
                    style={[styles.ratingButton, isSelected && styles.ratingButtonSelected]}
                    onPress={() => setLocalFilters({ 
                      ...localFilters, 
                      minRating: isSelected ? undefined : rating.value 
                    })}
                  >
                    <Text style={[styles.ratingText, isSelected && styles.ratingTextSelected]}>
                      ⭐ {rating.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Dietary Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dietary Options</Text>
            {DIETARY_OPTIONS.map(option => {
              const isSelected = localFilters.dietaryOptions?.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={styles.checkboxRow}
                  onPress={() => toggleDietaryOption(option)}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resetText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  chipSelected: {
    backgroundColor: '#FF6B35',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  priceCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  priceCardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FEF3E2',
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  priceLabelSelected: {
    color: '#FF6B35',
  },
  priceDesc: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceDescSelected: {
    color: '#FF6B35',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  ratingButtonSelected: {
    backgroundColor: '#FF6B35',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  ratingTextSelected: {
    color: '#FFFFFF',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  applyButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FilterModal;