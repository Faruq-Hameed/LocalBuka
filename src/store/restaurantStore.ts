import { create } from 'zustand';
import { RestaurantFilter, SortOption } from '../types/restaurant.types';

interface RestaurantStore {
  // Search state
  searchQuery: string;
  recentSearches: string[];
  setSearchQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Filter state
  filters: RestaurantFilter;
  sortBy: SortOption;
  setFilters: (filters: Partial<RestaurantFilter>) => void;
  setSortBy: (sortBy: SortOption) => void;
  resetFilters: () => void;
  
  // Filter modal
  isFilterModalVisible: boolean;
  setFilterModalVisible: (visible: boolean) => void;

  // Helper methods
  removeFilter: (filterType: keyof RestaurantFilter, value?: any) => void;
}

const initialFilterState: RestaurantFilter = {
  cuisine: [],
  maxDeliveryTime: undefined,
  minRating: undefined,
  priceRange: [],
  dietaryOptions: [],
  isOpen: undefined,
};

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  // Initial state
  searchQuery: '',
  recentSearches: [],
  filters: initialFilterState,
  sortBy: 'popular',
  isFilterModalVisible: false,

  // Search actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addRecentSearch: (query) => set((state) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return state;
    
    const filtered = state.recentSearches.filter(s => s !== trimmedQuery);
    return {
      recentSearches: [trimmedQuery, ...filtered].slice(0, 10)
    };
  }),
  
  clearRecentSearches: () => set({ recentSearches: [] }),

  // Filter actions
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  resetFilters: () => set({
    filters: initialFilterState,
    sortBy: 'popular',
    searchQuery: ''
  }),

  // Modal actions
  setFilterModalVisible: (visible) => set({ isFilterModalVisible: visible }),

  // Remove specific filter
  removeFilter: (filterType, value) => set((state) => {
    const newFilters = { ...state.filters };
    
    if (filterType === 'cuisine' && Array.isArray(newFilters.cuisine)) {
      newFilters.cuisine = newFilters.cuisine.filter(c => c !== value);
    } else if (filterType === 'priceRange' && Array.isArray(newFilters.priceRange)) {
      newFilters.priceRange = newFilters.priceRange.filter(p => p !== value);
    } else if (filterType === 'dietaryOptions' && Array.isArray(newFilters.dietaryOptions)) {
      newFilters.dietaryOptions = newFilters.dietaryOptions.filter(d => d !== value);
    } else {
      delete newFilters[filterType];
    }
    
    return { filters: newFilters };
  }),
}));