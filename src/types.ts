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

export interface TimeSlot {
  time: string;
  status: 'available' | 'booked';
  note?: string;
}

export interface AppointmentRecord {
  id: string;
  day: string; // 'Bugün' | 'Yarın' | 'Sonraki Gün'
  time: string; // '14:30'
  customerName: string;
  phone?: string;
  serviceNames: string[];
  totalPrice: number;
  note?: string;
  createdAt: string;
  status?: 'Beklemede' | 'Onaylandı' | 'Tamamlandı';
  source?: 'web' | 'admin';
}

export interface HaircutSample {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tag: string;
  matchedServiceId: string;
}
