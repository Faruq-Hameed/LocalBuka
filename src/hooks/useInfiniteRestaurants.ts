import { useState, useCallback } from 'react';
import { Restaurant } from '../types/restaurant.types';
import { ITEMS_PER_PAGE } from '../constants/filters';

interface UseInfiniteRestaurantsResult {
  displayedRestaurants: Restaurant[];
  loadMore: () => void;
  refresh: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
}

export function useInfiniteRestaurants(
  allRestaurants: Restaurant[]
): UseInfiniteRestaurantsResult {
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate displayed restaurants
  const displayedRestaurants = allRestaurants.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = displayedRestaurants.length < allRestaurants.length;

  // Load more restaurants
  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      
      // Simulate API delay
      setTimeout(() => {
        setPage(prev => prev + 1);
        setIsLoadingMore(false);
      }, 500);
    }
  }, [hasMore, isLoadingMore]);

  // Refresh (pull to refresh)
  const refresh = useCallback(() => {
    setIsRefreshing(true);
    
    // Simulate API refresh
    setTimeout(() => {
      setPage(1);
      setIsRefreshing(false);
    }, 1000);
  }, []);

  // Reset page when allRestaurants changes (filters/search changed)
  useState(() => {
    setPage(1);
  });

  return {
    displayedRestaurants,
    loadMore,
    refresh,
    hasMore,
    isLoadingMore,
    isRefreshing,
  };
}