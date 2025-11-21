
import { Restaurant } from '../types/restaurant.types';
//Mock data used for dev I will add yelp api later
export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'sweet-kiwi-001',
    name: 'Sweet Kiwi Cafe',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    cuisine: ['Nigerian', 'Continental', 'Desserts'],
    deliveryTime: { min: 25, max: 45 },
    rating: 4.5,
    priceRange: 2,
    dietaryOptions: ['Vegetarian', 'Gluten-Free'],
    isOpen: true,
    location: { latitude: 6.5244, longitude: 3.3792 },
  },
  {
    id: 'suya-palace-002',
    name: 'Suya Palace',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400',
    cuisine: ['Nigerian', 'Grill', 'African'],
    deliveryTime: { min: 35, max: 60 },
    rating: 4.7,
    priceRange: 2,
    dietaryOptions: ['Halal'],
    isOpen: true,
    location: { latitude: 6.6018, longitude: 3.3515 },
  },
  {
    id: 'mama-put-003',
    name: 'Mama Put Express',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    cuisine: ['Nigerian', 'Yoruba', 'Street Food'],
    deliveryTime: { min: 20, max: 35 },
    rating: 4.2,
    priceRange: 1,
    dietaryOptions: [],
    isOpen: true,
    location: { latitude: 6.5244, longitude: 3.3792 },
  },
  {
    id: 'jollof-kingdom-004',
    name: 'Jollof Kingdom',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400',
    cuisine: ['Nigerian', 'Jollof', 'Igbo'],
    deliveryTime: { min: 30, max: 50 },
    rating: 4.8,
    priceRange: 2,
    dietaryOptions: ['Halal', 'Vegetarian'],
    isOpen: true,
    location: { latitude: 6.5355, longitude: 3.3087 },
  },
  {
    id: 'pepperoni-grill-005',
    name: 'Pepperoni Grill House',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    cuisine: ['Italian', 'Continental'],
    deliveryTime: { min: 40, max: 70 },
    rating: 4.4,
    priceRange: 3,
    dietaryOptions: ['Vegetarian'],
    isOpen: false,
    location: { latitude: 6.4281, longitude: 3.4219 },
  },
  {
    id: 'asian-fusion-006',
    name: 'Asian Fusion Delight',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400',
    cuisine: ['Chinese', 'Continental'],
    deliveryTime: { min: 45, max: 75 },
    rating: 4.6,
    priceRange: 3,
    dietaryOptions: ['Vegan', 'Vegetarian', 'Gluten-Free'],
    isOpen: true,
    location: { latitude: 6.4281, longitude: 3.4219 },
  },
  {
    id: 'amala-spot-007',
    name: 'Amala & Gbegiri Spot',
    image: 'https://images.unsplash.com/photo-1625944525533-473f85db16a4?w=400',
    cuisine: ['Nigerian', 'Yoruba', 'Swallow'],
    deliveryTime: { min: 25, max: 40 },
    rating: 4.3,
    priceRange: 1,
    dietaryOptions: ['Vegetarian'],
    isOpen: true,
    location: { latitude: 6.5244, longitude: 3.3792 },
  },
  {
    id: 'fine-dining-008',
    name: 'Sky Restaurant & Lounge',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    cuisine: ['Continental', 'Nigerian', 'International'],
    deliveryTime: { min: 60, max: 90 },
    rating: 4.9,
    priceRange: 4,
    dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal'],
    isOpen: true,
    location: { latitude: 6.4281, longitude: 3.4219 },
  },
  {
    id: 'pepper-soup-009',
    name: 'Hot Pepper Soup Joint',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    cuisine: ['Nigerian', 'Pepper Soup', 'Hausa'],
    deliveryTime: { min: 20, max: 35 },
    rating: 4.1,
    priceRange: 1,
    dietaryOptions: ['Halal'],
    isOpen: true,
    location: { latitude: 6.5244, longitude: 3.3792 },
  },
  {
    id: 'pounded-yam-010',
    name: 'Pounded Yam Palace',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    cuisine: ['Nigerian', 'Swallow', 'Igbo'],
    deliveryTime: { min: 30, max: 50 },
    rating: 4.5,
    priceRange: 2,
    dietaryOptions: ['Vegetarian'],
    isOpen: true,
    location: { latitude: 6.6018, longitude: 3.3515 },
  },
];

// Function to generate more mock data for testing pagination
export const generateMockRestaurants = (count: number): Restaurant[] => {
  const names = [
    'Tasty Treats', 'Food Haven', 'Spice Corner', 'Urban Bites',
    'The Kitchen', 'Flavor Town', 'Eatery 54', 'Grill Masters',
    'Fresh Bites', 'Savory Spot', 'Culinary Point', 'Taste Buds'
  ];
  
  const cuisines = ['Nigerian', 'Continental', 'Chinese', 'Italian', 'Grill'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `restaurant-${i + 100}`,
    name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
    image: `https://images.unsplash.com/photo-${1555939594 + i}?w=400`,
    cuisine: [cuisines[i % cuisines.length], cuisines[(i + 1) % cuisines.length]],
    deliveryTime: { 
      min: 20 + (i % 4) * 10, 
      max: 40 + (i % 4) * 15 
    },
    rating: 3.5 + (i % 15) / 10,
    priceRange: ((i % 4) + 1) as 1 | 2 | 3 | 4,
    dietaryOptions: i % 3 === 0 ? ['Vegetarian'] : [],
    isOpen: i % 5 !== 0,
    location: { 
      latitude: 6.5 + (i % 10) / 100, 
      longitude: 3.3 + (i % 10) / 100 
    },
  }));
};

export const ALL_MOCK_RESTAURANTS = [
  ...MOCK_RESTAURANTS,
  ...generateMockRestaurants(50)
];