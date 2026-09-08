import { ServiceItem, WorkingHour, TimeSlot, HaircutSample } from '../types';
import logoImg from '../assets/images/vezir_v_logo_bold_1788793776844.jpg';
import clipperImg from '../assets/images/real_clipper_fade_1788793761768.jpg';
import interiorImg from '../assets/images/barber_interior_real_1788793792092.jpg';
import sampleFade from '../assets/images/haircut_fade_sample_1788793281016.jpg';
import sampleGroom from '../assets/images/haircut_groom_sample_1788793291601.jpg';
import sampleBeard from '../assets/images/haircut_beard_sample_1788793304343.jpg';

export const ASSETS = {
  logo: logoImg,
  clipper: clipperImg,
  interior: interiorImg,
  fadeSample: sampleFade,
  groomSample: sampleGroom,
  beardSample: sampleBeard,
};

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

export const HAIRCUT_SAMPLES: HaircutSample[] = [
  {
    id: 'sample-1',
    title: 'Kafa Yapısına Özel Skin Fade & Texture',
    category: 'Saç Kesimi',
    description: 'Kafa anatomisine göre milimetrik geçişli fade, ense hatları ve üst katman dokulandırma.',
    image: sampleFade,
    tag: 'En Çok Tercih Edilen',
    matchedServiceId: 'sac-trasi',
  },
  {
    id: 'sample-2',
    title: 'Özel Gün & Damat Tıraşı Tasarımı',
    category: 'VIP Bakım',
    description: 'Damatlık ve takım elbiseye kusursuz uyum sağlayan stil, fön ve kontürlü sakal bitişi.',
    image: sampleGroom,
    tag: 'Damat & Özel Gün',
    matchedServiceId: 'damat-tirasi',
  },
  {
    id: 'sample-3',
    title: 'Ustura Sakal Çizimi & Sıcak Havlu',
    category: 'Sakal Tasarımı',
    description: 'Milimetrik yanak çizgisi, çene formu belirleme, sıcak havlu kompresi ve ferahlatıcı yağ.',
    image: sampleBeard,
    tag: 'Usta Dokunuş',
    matchedServiceId: 'sakal-tirasi',
  },
];

export const SCHEDULE_DAYS = [
  { id: 'today', label: 'Bugün', subtitle: 'Tek Berber Seansları' },
  { id: 'tomorrow', label: 'Yarın', subtitle: 'Erken Rezervasyon' },
  { id: 'day_after', label: 'Sonraki Gün', subtitle: 'Haftalık Plan' },
];

export const DAILY_SLOTS: Record<string, TimeSlot[]> = {
  today: [
    { time: '09:30', status: 'available', note: 'Müsait' },
    { time: '10:15', status: 'available', note: 'Müsait' },
    { time: '11:00', status: 'available', note: 'Müsait' },
    { time: '11:45', status: 'available', note: 'Müsait' },
    { time: '13:00', status: 'available', note: 'Müsait' },
    { time: '13:45', status: 'available', note: 'Müsait' },
    { time: '14:30', status: 'available', note: 'Müsait' },
    { time: '15:15', status: 'available', note: 'Müsait' },
    { time: '16:00', status: 'available', note: 'Müsait' },
    { time: '16:45', status: 'available', note: 'Müsait' },
    { time: '17:30', status: 'available', note: 'Müsait' },
    { time: '18:15', status: 'available', note: 'Müsait' },
    { time: '19:00', status: 'available', note: 'Müsait' },
    { time: '19:45', status: 'available', note: 'Müsait' },
    { time: '20:15', status: 'available', note: 'Müsait' },
  ],
  tomorrow: [
    { time: '09:30', status: 'available', note: 'Müsait' },
    { time: '10:15', status: 'available', note: 'Müsait' },
    { time: '11:00', status: 'available', note: 'Müsait' },
    { time: '11:45', status: 'available', note: 'Müsait' },
    { time: '13:00', status: 'available', note: 'Müsait' },
    { time: '13:45', status: 'available', note: 'Müsait' },
    { time: '14:30', status: 'available', note: 'Müsait' },
    { time: '15:15', status: 'available', note: 'Müsait' },
    { time: '16:00', status: 'available', note: 'Müsait' },
    { time: '16:45', status: 'available', note: 'Müsait' },
    { time: '17:30', status: 'available', note: 'Müsait' },
    { time: '18:15', status: 'available', note: 'Müsait' },
    { time: '19:00', status: 'available', note: 'Müsait' },
    { time: '19:45', status: 'available', note: 'Müsait' },
    { time: '20:15', status: 'available', note: 'Müsait' },
  ],
  day_after: [
    { time: '09:30', status: 'available', note: 'Müsait' },
    { time: '10:15', status: 'available', note: 'Müsait' },
    { time: '11:00', status: 'available', note: 'Müsait' },
    { time: '11:45', status: 'available', note: 'Müsait' },
    { time: '13:00', status: 'available', note: 'Müsait' },
    { time: '13:45', status: 'available', note: 'Müsait' },
    { time: '14:30', status: 'available', note: 'Müsait' },
    { time: '15:15', status: 'available', note: 'Müsait' },
    { time: '16:00', status: 'available', note: 'Müsait' },
    { time: '16:45', status: 'available', note: 'Müsait' },
    { time: '17:30', status: 'available', note: 'Müsait' },
    { time: '18:15', status: 'available', note: 'Müsait' },
    { time: '19:00', status: 'available', note: 'Müsait' },
    { time: '19:45', status: 'available', note: 'Müsait' },
    { time: '20:15', status: 'available', note: 'Müsait' },
  ],
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

export function getShopStatus(): { isOpen: boolean; text: string; details: string; isNightClosed: boolean } {
  // Turkey Time (UTC+3)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const turkeyTime = new Date(utc + 3600000 * 3);

  const day = turkeyTime.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const hour = turkeyTime.getHours();
  const minute = turkeyTime.getMinutes();
  const currentTime = hour * 60 + minute;

  // Sunday is closed
  if (day === 0) {
    return {
      isOpen: false,
      text: 'Pazar Günü Kapalı',
      details: 'Pazartesi sabah 09:00’da hizmetinizdeyiz. Yarın için randevu oluşturabilirsiniz.',
      isNightClosed: false,
    };
  }

  const openTime = 9 * 60; // Sabah 09:00
  const closeTime = 21 * 60; // Akşam 21:00 (saat 9)

  // Gece veya sabah saat 9 öncesi kapalı
  if (currentTime < openTime || currentTime >= closeTime) {
    return {
      isOpen: false,
      text: 'Şu Anda Kapalı',
      details: 'Salonumuz akşam 21:00 ile sabah 09:00 arası kapalıdır. Yarın için randevu alabilirsiniz.',
      isNightClosed: true,
    };
  }

  // Açık saatler: 09:00 - 21:00
  return {
    isOpen: true,
    text: 'Şu An Açık',
    details: 'Tek berber, birebir usta hizmeti. Akşam 21:00’e kadar açığız.',
    isNightClosed: false,
  };
}
