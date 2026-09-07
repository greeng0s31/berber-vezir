import { ServiceItem, WorkingHour } from '../types';

export const BUSINESS_INFO = {
  name: 'Berber Vezir',
  title: 'Erkek Kuaförü',
  locationText: 'Hamitler Mahallesi, Bursa',
  phone: '0533 766 7216',
  phoneRaw: '05337667216',
  phoneInternational: '+905337667216',
  address: 'Hamitler Mahallesi, Osmangazi, Bursa',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hamitler+Mahallesi+Osmangazi+Bursa',
  whatsappUrl: 'https://wa.me/905337667216',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'sac-trasi',
    name: 'Kafa Yapısına Uygun Saç Tıraşı',
    description: 'Kafa ve yüz anatomisine özel modern ve klasik saç kesimi, ense temizliği ve kişiye özel form.',
    iconName: 'Scissors',
    duration: '35-45 dk',
    price: 400,
  },
  {
    id: 'sakal-tirasi',
    name: 'Sakal Tıraşı',
    description: 'Sıcak havlu kompresi, ustura ile milimetrik sakal çizgisi düzeltme ve besleyici sakal bakım yağı.',
    iconName: 'Flame',
    duration: '20 dk',
    price: 150,
  },
  {
    id: 'sac-yikama',
    name: 'Saç Yıkama',
    description: 'Ferahlatıcı kafa derisi masajı, canlandırıcı tonik ve profesyonel saç temizleme ritüeli.',
    iconName: 'Droplets',
    duration: '15 dk',
    price: 100,
  },
  {
    id: 'cilt-bakimi',
    name: 'Cilt Bakımı',
    description: 'Sıcak buharla derin gözenek açma, siyah nokta arındırma ve canlandırıcı ferah yüz maskesi.',
    iconName: 'Sparkles',
    duration: '30 dk',
    price: 200,
  },
  {
    id: 'damat-tirasi',
    name: 'Damat Tıraşı',
    description: 'Özel gününüze yakışır VIP saç ve sakal tasarımı, cilt bakımı, saç yıkama, fön ve detaylı bakım ritüeli.',
    iconName: 'Crown',
    duration: '75-90 dk',
    price: 1500,
  },
  {
    id: 'her-sey-dahil-kampanya',
    name: 'Her Şey Dahil Kampanya',
    description: 'Kafa yapısına uygun saç tıraşı + sakal tıraşı + saç yıkama + cilt bakımı komple avantajlı paket.',
    iconName: 'Package',
    duration: '60-75 dk',
    price: 750,
    badge: 'Avantajlı Paket',
  },
];

export const WORKING_HOURS: WorkingHour[] = [
  { day: 'Pazartesi', hours: '09:00 - 21:00' },
  { day: 'Salı', hours: '09:00 - 21:00' },
  { day: 'Çarşamba', hours: '09:00 - 21:00' },
  { day: 'Perşembe', hours: '09:00 - 21:00' },
  { day: 'Cuma', hours: '09:00 - 21:00' },
  { day: 'Cumartesi', hours: '09:00 - 20:00' },
  { day: 'Pazar', hours: 'Kapalı' },
];

export function getShopStatus(): { isOpen: boolean; text: string; details: string } {
  // Using Turkey Time (UTC+3)
  const now = new Date();
  // Turkey is UTC+3
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const turkeyTime = new Date(utc + 3600000 * 3);

  const day = turkeyTime.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const hour = turkeyTime.getHours();
  const minute = turkeyTime.getMinutes();
  const currentTime = hour * 60 + minute;

  if (day === 0) {
    return {
      isOpen: false,
      text: 'Pazar Günleri Kapalıyız',
      details: 'Pazartesi 09:00’da hizmetinizdeyiz',
    };
  }

  const openTime = 9 * 60; // 09:00
  const closeTime = day === 6 ? 20 * 60 : 21 * 60; // 20:00 on Saturday, 21:00 on weekdays

  if (currentTime >= openTime && currentTime < closeTime) {
    const closingHourStr = day === 6 ? '20:00' : '21:00';
    return {
      isOpen: true,
      text: 'Şu An Açık',
      details: `Bugün ${closingHourStr}'e kadar hizmetinizdeyiz`,
    };
  } else {
    return {
      isOpen: false,
      text: 'Şu An Kapalı',
      details: 'Çalışma saatleri: Hafta içi 09:00-21:00 | Cts 09:00-20:00',
    };
  }
}
