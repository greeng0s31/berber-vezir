import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import FloatingActionBar from './components/FloatingActionBar';
import { ServiceItem } from './types';

export default function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenAppointment = () => {
    setSelectedService(null);
    setIsAppointmentOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setIsAppointmentOpen(true);
  };

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#f5f5f5] flex flex-col font-['Montserrat',sans-serif]">
      {/* Header */}
      <Header onOpenAppointment={handleOpenAppointment} />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero onOpenAppointment={handleOpenAppointment} />

        {/* Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Contact & Hours Section */}
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
      />
    </div>
  );
}
