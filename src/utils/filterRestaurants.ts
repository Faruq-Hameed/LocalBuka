import { Restaurant, RestaurantFilter, SortOption } from '../types/restaurant.types';

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: RestaurantFilter
): Restaurant[] {
  return restaurants.filter((restaurant) => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = restaurant.name.toLowerCase().includes(query);
      const matchesCuisine = restaurant.cuisine.some(c => 
        c.toLowerCase().includes(query)
      );
      if (!matchesName && !matchesCuisine) return false;
    }

    // Cuisine filter
    if (filters.cuisine && filters.cuisine.length > 0) {
      const hasCuisine = filters.cuisine.some(cuisine =>
        restaurant.cuisine.includes(cuisine)
      );
      if (!hasCuisine) return false;
    }

    // Max delivery time filter
    if (filters.maxDeliveryTime !== undefined) {
      if (restaurant.deliveryTime.max > filters.maxDeliveryTime) return false;
    }

    // Minimum rating filter
    if (filters.minRating !== undefined) {
      if (restaurant.rating < filters.minRating) return false;
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange.length > 0) {
      if (!filters.priceRange.includes(restaurant.priceRange)) return false;
    }

    // Dietary options filter
    if (filters.dietaryOptions && filters.dietaryOptions.length > 0) {
      const hasDietaryOption = filters.dietaryOptions.some(option =>
        restaurant.dietaryOptions.includes(option)
      );
      if (!hasDietaryOption) return false;
    }

    // Open status filter
    if (filters.isOpen !== undefined) {
      if (restaurant.isOpen !== filters.isOpen) return false;
    }

    return true;
  });
}

export function sortRestaurants(
  restaurants: Restaurant[],
  sortBy: SortOption
): Restaurant[] {
  const sorted = [...restaurants];

  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    
    case 'deliveryTime':
      return sorted.sort((a, b) => a.deliveryTime.min - b.deliveryTime.min);
    
    case 'price':
      return sorted.sort((a, b) => a.priceRange - b.priceRange);
    
    case 'popular':
    default:
      // Popular = combination of rating and availability
      return sorted.sort((a, b) => {
        if (a.isOpen !== b.isOpen) return a.isOpen ? -1 : 1;
        return b.rating - a.rating;
      });
  }
}

export function getActiveFiltersCount(filters: RestaurantFilter): number {
  let count = 0;
  
  if (filters.cuisine && filters.cuisine.length > 0) count += filters.cuisine.length;
  if (filters.priceRange && filters.priceRange.length > 0) count += filters.priceRange.length;
  if (filters.minRating !== undefined) count += 1;
  if (filters.maxDeliveryTime !== undefined) count += 1;
  if (filters.dietaryOptions && filters.dietaryOptions.length > 0) count += filters.dietaryOptions.length;
  if (filters.isOpen !== undefined) count += 1;
  
  return count;
}

export function getFilterLabel(
  filterType: keyof RestaurantFilter,
  value: any
): string {
  switch (filterType) {
    case 'minRating':
      return `${value}+ Rating`;
    case 'maxDeliveryTime':
      return `${value} min delivery`;
    case 'priceRange':
      return '₦'.repeat(value);
    case 'isOpen':
      return 'Open Now';
    default:
      return String(value);
  }
}