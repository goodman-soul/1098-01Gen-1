export type Category = 'tent' | 'stove' | 'sleeping-bag' | 'backpack';
export type Weather = 'sunny' | 'rainy' | 'snowy';
export type Distance = 'short' | 'medium' | 'long';

export interface Equipment {
  id: string;
  category: Category;
  name: string;
  brand: string;
  image: string;
  price: number;
  weight: number;
  weatherRating: Weather[];
  rating: number;
  description: string;
  tags: string[];
  minPeople?: number;
  maxPeople?: number;
  capacity?: number;
  temperatureRating?: {
    comfort: number;
    limit: number;
  };
  fuelType?: string;
  boilTime?: string;
}

export interface SelectedEquipment {
  equipment: Equipment;
  quantity: number;
}

export interface Combo {
  id: string;
  name: string;
  createdAt: string;
  items: Record<Category, SelectedEquipment | null>;
  totalWeight: number;
  totalPrice: number;
}

export interface Filters {
  weather: Weather | 'all';
  people: number;
  distance: Distance | 'all';
  minBudget: number;
  maxBudget: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  tent: '帐篷',
  stove: '炉具',
  'sleeping-bag': '睡袋',
  backpack: '背包',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  tent: '⛺',
  stove: '🔥',
  'sleeping-bag': '🛏️',
  backpack: '🎒',
};

export const WEATHER_LABELS: Record<Weather | 'all', string> = {
  all: '全部天气',
  sunny: '☀️ 晴天',
  rainy: '🌧️ 雨天',
  snowy: '❄️ 雪天',
};

export const DISTANCE_LABELS: Record<Distance | 'all', string> = {
  all: '不限距离',
  short: '🚶 短途 (<5km)',
  medium: '🥾 中途 (5-20km)',
  long: '🏔️ 长途 (>20km)',
};
