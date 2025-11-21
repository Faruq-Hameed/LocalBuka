import { useMemo } from 'react';
import { useRestaurantStore } from '../store/restaurantStore';
import { useDebounce } from './useDebounce';
import { filterRestaurants, sortRestaurants } from '../utils/filterRestaurants';
import { Restaurant } from '../types/restaurant.types';
import { DEBOUNCE_DELAY } from '../constants/filters';

export function useRestaurantSearch(restaurants: Restaurant[]) {
  const { searchQuery, filters, sortBy } = useRestaurantStore();
  
  // Debounce search query
  const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  // Memoized filtered and sorted restaurants
  const processedRestaurants = useMemo(() => {
    // Combine search query with filters
    const combinedFilters = {
      ...filters,
      searchQuery: debouncedQuery,
    };

    // Filter restaurants
    const filtered = filterRestaurants(restaurants, combinedFilters);

    // Sort restaurants
    const sorted = sortRestaurants(filtered, sortBy);

    return sorted;
  }, [restaurants, filters, debouncedQuery, sortBy]);

  return {
    restaurants: processedRestaurants,
    isSearching: searchQuery !== debouncedQuery,
    totalCount: processedRestaurants.length,
  };
}