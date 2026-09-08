import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LiveScheduleMenu from './components/LiveScheduleMenu';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import AdminPanelModal from './components/AdminPanelModal';
import FloatingActionBar from './components/FloatingActionBar';
import CinematicIntro from './components/CinematicIntro';
import { ServiceItem, AppointmentRecord } from './types';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('Bugün');
  const [selectedTime, setSelectedTime] = useState<string>('14:30');

  // Varsayılan başlangıç randevuları (ilk açılışta admin masasını dolu göstermek için)
  const DEFAULT_INITIAL_APPOINTMENTS: AppointmentRecord[] = [
    {
      id: 'app_seed_1',
      day: 'Bugün',
      time: '11:45',
      customerName: 'Ahmet Demir',
      phone: '0532 555 1234',
      serviceNames: ['Saç Tıraşı (Kafa Yapısına Uygun)', 'Sakal Tıraşı & Ustura Çizimi'],
      totalPrice: 600,
      note: 'Kafa yapısına uygun yanlar sıfır, ense oval.',
      status: 'Onaylandı',
      source: 'web',
      createdAt: '09:40',
    },
    {
      id: 'app_seed_2',
      day: 'Bugün',
      time: '16:00',
      customerName: 'Burak Korkmaz',
      phone: '0544 333 9876',
      serviceNames: ['Her Şey Dahil VIP Bakım & Tıraş'],
      totalPrice: 900,
      note: 'Özel davet için tıraş, fön ve buhar bakımı.',
      status: 'Onaylandı',
      source: 'web',
      createdAt: '10:15',
    },
  ];

  // Kayıtlı Randevular (LocalStorage ile kalıcı)
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('berber_vezir_appointments_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_INITIAL_APPOINTMENTS;
  });

  // Dolu Saatler (LocalStorage & appointments senkronu)
  const [bookedSlots, setBookedSlots] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('berber_vezir_booked_slots');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return ['Bugün_11:45', 'Bugün_16:00'];
  });

  // Randevular değiştikçe localStorage'a kaydet ve bookedSlots senkronize et
  const syncAppointmentsAndSlots = (
    newAppointments: AppointmentRecord[],
    extraBookedKeys?: string[]
  ) => {
    setAppointments(newAppointments);
    try {
      localStorage.setItem('berber_vezir_appointments_v1', JSON.stringify(newAppointments));
    } catch {
      // ignore
    }

    // Dolu saatleri türet (sadece tek berber kuralı: her randevu kendi slotunu kilitler)
    const appSlotKeys = newAppointments.map((a) => `${a.day}_${a.time}`);
    const combinedKeys = Array.from(new Set([...appSlotKeys, ...(extraBookedKeys || [])]));
    setBookedSlots(combinedKeys);
    try {
      localStorage.setItem('berber_vezir_booked_slots', JSON.stringify(combinedKeys));
    } catch {
      // ignore
    }
  };

  // Müşterinin siteden aldığı randevuyu detaylarıyla kaydet (Admin paneline anında düşer)
  const handleBookSlot = (
    day: string,
    time: string,
    details?: {
      customerName?: string;
      phone?: string;
      serviceNames?: string[];
      totalPrice?: number;
      note?: string;
      source?: 'web' | 'admin';
    }
  ) => {
    const slotKey = `${day}_${time}`;
    const newRecord: AppointmentRecord = {
      id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      day,
      time,
      customerName: details?.customerName || 'Online Müşteri',
      phone: details?.phone,
      serviceNames: details?.serviceNames || ['Saç Tıraşı (Kafa Yapısına Uygun)'],
      totalPrice: details?.totalPrice || 400,
      note: details?.note,
      status: 'Onaylandı',
      source: details?.source || 'web',
      createdAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedAppointments = [
      ...appointments.filter((a) => !(a.day === day && a.time === time)),
      newRecord,
    ];
    syncAppointmentsAndSlots(updatedAppointments, [slotKey]);
  };

  // Admin panelinden yeni randevu ekleme
  const handleAdminAddAppointment = (recordData: Omit<AppointmentRecord, 'id' | 'createdAt'>) => {
    const newRecord: AppointmentRecord = {
      ...recordData,
      id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [...appointments, newRecord];
    syncAppointmentsAndSlots(updated, [`${recordData.day}_${recordData.time}`]);
  };

  // Admin panelinden randevu silme (saati tekrar müsait yapar)
  const handleAdminDeleteAppointment = (id: string, day: string, time: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    const slotKey = `${day}_${time}`;
    const updatedBooked = bookedSlots.filter((k) => k !== slotKey);
    setAppointments(updated);
    setBookedSlots(updatedBooked);
    try {
      localStorage.setItem('berber_vezir_appointments_v1', JSON.stringify(updated));
      localStorage.setItem('berber_vezir_booked_slots', JSON.stringify(updatedBooked));
    } catch {
      // ignore
    }
  };

  // Admin panelinden randevu durumu güncelleme
  const handleAdminUpdateStatus = (id: string, newStatus: 'Beklemede' | 'Onaylandı' | 'Tamamlandı') => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    setAppointments(updated);
    try {
      localStorage.setItem('berber_vezir_appointments_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Smoothly scroll down to the Live Schedule & Menu
    setTimeout(() => {
      const menuEl = document.getElementById('randevu-menusu');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleOpenAppointment = () => {
    setSelectedService(null);
    setIsAppointmentOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setIsAppointmentOpen(true);
  };

  const handleSelectSlot = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setIsAppointmentOpen(true);
  };

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#f5f5f5] flex flex-col font-['Montserrat',sans-serif]">
      {/* Cinematic Clipper Zoom Intro */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Header with V Logo & Replay Intro (Logoya tıklayınca Yönetici Paneli açılır) */}
      <Header
        onOpenAppointment={handleOpenAppointment}
        onReplayIntro={() => setShowIntro(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with V Crest */}
        <Hero onOpenAppointment={handleOpenAppointment} />

        {/* Live Availability & Schedule Menu */}
        <LiveScheduleMenu
          onSelectSlot={handleSelectSlot}
          onOpenAppointment={handleOpenAppointment}
          bookedSlots={bookedSlots}
        />

        {/* Real Haircut Gallery Showcase */}
        <GallerySection onSelectService={handleSelectService} />

        {/* Services & Pricing Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Contact, Hours & Map Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Action Bar */}
      <FloatingActionBar onOpenAppointment={handleOpenAppointment} />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={handleCloseAppointment}
        initialService={selectedService}
        initialDay={selectedDay}
        initialTime={selectedTime}
        bookedSlots={bookedSlots}
        onBookSlot={handleBookSlot}
      />

      {/* Admin Control Panel (Logoya tıklanınca açılır, Kullanıcı: berbervezir, Şifre: 12345) */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        appointments={appointments}
        onAddAppointment={handleAdminAddAppointment}
        onDeleteAppointment={handleAdminDeleteAppointment}
        onUpdateStatus={handleAdminUpdateStatus}
      />
    </div>
  );
}
