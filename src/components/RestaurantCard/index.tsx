import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Restaurant } from '../../types/restaurant.types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress?: () => void;
}

const RestaurantCard = ({ restaurant, onPress }: RestaurantCardProps) => {
  const {
    name,
    image,
    cuisine,
    deliveryTime,
    rating,
    priceRange,
    isOpen,
  } = restaurant;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Open Status Badge */}
        <View style={[styles.badge, isOpen ? styles.openBadge : styles.closedBadge]}>
          <Text style={styles.badgeText}>
            {isOpen ? 'OPEN' : 'CLOSED'}
          </Text>
        </View>
      </View>

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        
        <Text style={styles.cuisine} numberOfLines={1}>
          {cuisine.join(' • ')}
        </Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Rating */}
          <View style={styles.stat}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.statText}>{rating.toFixed(1)}</Text>
          </View>

          {/* Delivery Time */}
          <View style={styles.stat}>
            <Text style={styles.icon}>🕐</Text>
            <Text style={styles.statText}>
              {deliveryTime.min}-{deliveryTime.max} min
            </Text>
          </View>

          {/* Price Range */}
          <View style={styles.stat}>
            <Text style={styles.priceText}>
              {'₦'.repeat(priceRange)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 192,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openBadge: {
    backgroundColor: '#10B981',
  },
  closedBadge: {
    backgroundColor: '#EF4444',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    fontSize: 16,
  },
  icon: {
    fontSize: 16,
  },
  statText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  priceText: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '600',
  },
});

export default memo(RestaurantCard);