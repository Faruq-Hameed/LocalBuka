//restaurant type definition
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  deliveryTime: {
    min: number;
    max: number;
  };
  rating: number;
  priceRange: 1 | 2 | 3 | 4;
  dietaryOptions: string[];
  isOpen: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietaryTags: string[];
  isAvailable: boolean;
  preparationTime?: number;
}

export interface RestaurantWithMenu extends Restaurant {
  menu: MenuItem[];
  deliveryFee: number;
  minimumOrder: number;
  promotions: string[];
}

export type RestaurantFilter = {
  cuisine?: string[];
  maxDeliveryTime?: number;
  minRating?: number;
  priceRange?: (1 | 2 | 3 | 4)[];
  dietaryOptions?: string[];
  isOpen?: boolean;
  searchQuery?: string;
};

export type SortOption = 
  | 'rating' 
  | 'deliveryTime' 
  | 'price' 
  | 'popular';

export interface FilterState extends RestaurantFilter {
  sortBy: SortOption;
}

export interface SearchState {
  query: string;
  recentSearches: string[];
}

export interface PaginationState {
  page: number;
  hasMore: boolean;
  isLoading: boolean;
}