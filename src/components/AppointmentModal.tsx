import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MessageSquare, Phone, Check, Scissors } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/barberData';
import { ServiceItem } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
}

const TIME_SLOTS = [
  '09:30', '10:30', '11:30', '13:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00'
];

export default function AppointmentModal({ isOpen, onClose, initialService }: AppointmentModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || SERVICES[0].id
  );
  const [selectedDay, setSelectedDay] = useState<string>('Bugün');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [customerName, setCustomerName] = useState<string>('');
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (initialService?.id) {
      setSelectedServiceId(initialService.id);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const buildWhatsAppMessage = () => {
    let msg = `Merhaba Berber Vezir, randevu talebinde bulunmak istiyorum:\n`;
    msg += `✂️ Hizmet: ${currentService.name} (${currentService.price} ₺)\n`;
    msg += `📅 Tarih: ${selectedDay}\n`;
    msg += `⏰ Saat: ${selectedTime}\n`;
    if (customerName.trim()) {
      msg += `👤 İsim: ${customerName.trim()}\n`;
    }
    if (note.trim()) {
      msg += `📝 Not: ${note.trim()}\n`;
    }
    msg += `\nBu saatte müsaitlik var mıdır? Teşekkürler.`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/905337667216?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#181818] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#f5f5f5] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[#222222] border border-[#333333] hover:border-[#d4af37] text-[#888888] hover:text-[#f5f5f5] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222222] border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] mb-2 uppercase tracking-wide">
            <Scissors className="w-3.5 h-3.5" />
            Hızlı Randevu
          </div>
          <h3 className="font-['Cinzel',serif] text-2xl font-bold text-[#f5f5f5]">
            Berber Vezir Randevu
          </h3>
          <p className="text-xs sm:text-sm text-[#999999] mt-1">
            İstediğiniz hizmet ve saati belirleyip WhatsApp veya telefonla anında randevu oluşturun.
          </p>
        </div>

        {/* Form Body */}
        <div className="space-y-5">
          {/* 1. Service Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
              Hizmet Seçin
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {SERVICES.map((srv) => {
                const isSelected = srv.id === selectedServiceId;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2a2412] border-[#d4af37] text-[#f5f5f5]'
                        : 'bg-[#202020] border-[#303030] text-[#aaaaaa] hover:border-[#555555]'
                    }`}
                  >
                    <div className="flex flex-col truncate pr-2">
                      <span className="font-semibold text-[#f0f0f0] truncate">{srv.name}</span>
                      <span className="text-[11px] text-[#d4af37] font-mono font-medium">{srv.price} ₺</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#d4af37] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Date Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Tarih Tercihi
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Bugün', 'Yarın', 'Farklı Bir Gün'].map((day) => {
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`py-2 px-3 rounded-lg border text-center text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#121212] border-[#d4af37]'
                        : 'bg-[#202020] border-[#303030] text-[#cccccc] hover:border-[#555555]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Time Slots */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Saat Tercihi
            </label>
            <div className="grid grid-cols-4 gap-1.5 max-h-28 overflow-y-auto pr-1">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-1.5 px-2 rounded border text-center text-xs font-mono font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#121212] border-[#d4af37] font-bold'
                        : 'bg-[#202020] border-[#303030] text-[#999999] hover:text-[#f0f0f0] hover:border-[#444444]'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Optional Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
              Adınız (İsteğe Bağlı)
            </label>
            <input
              type="text"
              placeholder="Örn: Ahmet Yılmaz"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#202020] border border-[#333333] text-sm text-[#f5f5f5] placeholder-[#666666] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Action Buttons as requested: WhatsApp veya Arama açılsın */}
          <div className="pt-3 border-t border-[#2a2a2a] space-y-2.5">
            {/* WhatsApp Randevu Butonu */}
            <button
              onClick={handleWhatsAppClick}
              id="modal-whatsapp-btn"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1ebe5b] hover:from-[#2bf075] hover:to-[#22d667] text-[#0c2a13] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-[0.99] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp ile Randevu Talebi Gönder</span>
            </button>

            {/* Direkt Ara Butonu */}
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              id="modal-call-btn"
              className="w-full py-3 px-4 rounded-xl bg-[#222222] hover:bg-[#2a2a2a] text-[#f5f5f5] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>Telefonla Direkt Ara ({BUSINESS_INFO.phone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
