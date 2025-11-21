export const CUISINE_OPTIONS = [
  'Nigerian',
  'Yoruba',
  'Igbo',
  'Hausa',
  'Continental',
  'Chinese',
  'Italian',
  'Suya',
  'Swallow',
  'Pepper Soup',
  'Jollof',
];

export const PRICE_RANGES = [
  { value: 1, label: '₦', description: '₦500 - ₦1,500' },
  { value: 2, label: '₦₦', description: '₦1,500 - ₦4,000' },
  { value: 3, label: '₦₦₦', description: '₦4,000 - ₦8,000' },
  { value: 4, label: '₦₦₦₦', description: '₦8,000+' },
] as const;

export const RATING_OPTIONS = [
  { value: 3.0, label: '3.0+' },
  { value: 4.0, label: '4.0+' },
  { value: 4.5, label: '4.5+' },
];

export const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Halal',
  'Gluten-Free',
];

export const SORT_OPTIONS = [
  { value: 'popular' as const, label: 'Popular' },
  { value: 'rating' as const, label: 'Highest Rated' },
  { value: 'deliveryTime' as const, label: 'Fastest Delivery' },
  { value: 'price' as const, label: 'Price: Low to High' },
];

export const DELIVERY_TIME_RANGE = {
  min: 15,
  max: 90,
  step: 5,
};

export const DEBOUNCE_DELAY = 300; // milliseconds

export const ITEMS_PER_PAGE = 10;