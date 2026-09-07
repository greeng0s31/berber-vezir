export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  iconName: 'Scissors' | 'Sparkles' | 'Wind' | 'Droplets' | 'Smile' | 'Flame' | 'Crown' | 'Package';
  duration: string;
  price: number;
  badge?: string;
}

export interface WorkingHour {
  day: string;
  hours: string;
  isToday?: boolean;
  isOpen?: boolean;
}
