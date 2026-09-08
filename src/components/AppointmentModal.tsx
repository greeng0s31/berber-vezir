import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MessageSquare, Phone, Check, Scissors, CheckSquare, Square, FileText, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/barberData';
import { ServiceItem } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
  initialDay?: string;
  initialTime?: string;
  bookedSlots?: string[];
  onBookSlot?: (
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
  ) => void;
}

const TIME_SLOTS = [
  '09:30', '10:15', '11:00', '11:45',
  '13:00', '13:45', '14:30', '15:15',
  '16:00', '16:45', '17:30', '18:15',
  '19:00', '19:45', '20:15'
];

export default function AppointmentModal({
  isOpen,
  onClose,
  initialService,
  initialDay,
  initialTime,
  bookedSlots = [],
  onBookSlot,
}: AppointmentModalProps) {
  // Çoklu seçim desteği: Seçilen hizmetlerin ID dizisi
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    initialService?.id || SERVICES[0].id,
  ]);
  const [selectedDay, setSelectedDay] = useState<string>(initialDay || 'Bugün');
  const [selectedTime, setSelectedTime] = useState<string>(initialTime || '14:30');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isConfirmedSuccess, setIsConfirmedSuccess] = useState(false);

  useEffect(() => {
    if (initialService?.id) {
      setSelectedServiceIds((prev) =>
        prev.includes(initialService.id) ? prev : [...prev, initialService.id]
      );
    }
  }, [initialService]);

  useEffect(() => {
    if (initialDay) setSelectedDay(initialDay);
    if (initialTime) setSelectedTime(initialTime);
    setIsConfirmedSuccess(false);
  }, [initialDay, initialTime, isOpen]);

  // Hizmet açıp kapatma (toggle)
  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        // En az 1 hizmet seçili kalsın
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const slotKey = `${selectedDay}_${selectedTime}`;
  const isCurrentSlotBooked = bookedSlots.includes(slotKey);

  const buildWhatsAppMessage = () => {
    let msg = `Merhaba Berber Vezir, tek kişilik usta koltuğunuz için randevu talebim var:\n\n`;
    msg += `✂️ SEÇİLEN HİZMETLER:\n`;
    selectedServices.forEach((s) => {
      msg += `• ${s.name} (${s.price} ₺)\n`;
    });
    msg += `\n💰 TOPLAM TUTAR: ${totalPrice} ₺\n`;
    msg += `📅 TARİH: ${selectedDay}\n`;
    msg += `⏰ SAAT: ${selectedTime}\n`;
    if (customerName.trim()) {
      msg += `👤 İSİM: ${customerName.trim()}\n`;
    }
    if (customerPhone.trim()) {
      msg += `📞 TEL: ${customerPhone.trim()}\n`;
    }
    if (note.trim()) {
      msg += `📝 NOT: ${note.trim()}\n`;
    }
    msg += `\nBu saat müsaitse randevumu onaylar mısınız? Teşekkürler.`;
    return encodeURIComponent(msg);
  };

  const handleConfirmAndWhatsApp = () => {
    // Randevuyu sisteme kaydet, admin paneline aktar ve saati "Randevulu" yap
    if (onBookSlot) {
      onBookSlot(selectedDay, selectedTime, {
        customerName: customerName.trim() || 'Online Müşteri',
        phone: customerPhone.trim() || undefined,
        serviceNames: selectedServices.map((s) => s.name),
        totalPrice,
        note: note.trim() || undefined,
        source: 'web',
      });
    }
    setIsConfirmedSuccess(true);

    const url = `https://wa.me/905337667216?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleConfirmDirect = () => {
    if (onBookSlot) {
      onBookSlot(selectedDay, selectedTime, {
        customerName: customerName.trim() || 'Online Müşteri',
        phone: customerPhone.trim() || undefined,
        serviceNames: selectedServices.map((s) => s.name),
        totalPrice,
        note: note.trim() || undefined,
        source: 'web',
      });
    }
    setIsConfirmedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn font-['Plus_Jakarta_Sans',sans-serif]">
      <div
        className="relative w-full max-w-xl bg-[#171717] border border-[#d4af37]/40 rounded-3xl shadow-2xl p-5 sm:p-7 text-[#f5f5f5] my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#222222] border border-[#333333] hover:border-[#d4af37] text-[#888888] hover:text-[#f5f5f5] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201d12] border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] mb-2 uppercase tracking-wide">
            <Scissors className="w-3.5 h-3.5" />
            Tek Berber • Birebir Usta Hizmeti
          </div>
          <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-[#f5f5f5]">
            Berber Vezir Randevu
          </h3>
          <p className="text-xs sm:text-sm text-[#a0a0a0] mt-1">
            İstediğiniz hizmetleri çoklu olarak seçebilir (örnek: <span className="text-[#d4af37] font-semibold">Saç Tıraşı + Sakal</span>), müsait saatlerden tek berber randevunuzu anında oluşturabilirsiniz.
          </p>
        </div>

        {isConfirmedSuccess && (
          <div className="mb-5 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-sm flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Randevunuz Kaydedildi!</p>
              <p className="text-xs text-emerald-300">
                {selectedDay} saat {selectedTime} seansı sizin adınıza "Randevulu" olarak işaretlendi.
              </p>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="space-y-5">
          {/* 1. Multiple Service Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Hizmetleri Seçin (Çoklu Seçim)
              </label>
              <span className="text-[11px] text-[#999999]">
                {selectedServiceIds.length} hizmet seçili
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
              {SERVICES.map((srv) => {
                const isSelected = selectedServiceIds.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#2d2511] to-[#1c1809] border-[#d4af37] text-[#f5f5f5] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'bg-[#1f1f1f] border-[#303030] text-[#a0a0a0] hover:border-[#555555] hover:text-[#d0d0d0]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 pr-2">
                      <div className="mt-0.5 shrink-0 text-[#d4af37]">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#d4af37]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#555555]" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-semibold text-xs leading-snug ${isSelected ? 'text-[#f5f5f5]' : 'text-[#cccccc]'}`}>
                          {srv.name}
                        </span>
                        <span className="text-[11px] text-[#888888] mt-0.5">{srv.duration}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#d4af37] font-mono shrink-0 ml-1">
                      {srv.price} ₺
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Total Calculation Strip */}
            <div className="mt-2.5 p-3 rounded-xl bg-[#222019] border border-[#d4af37]/35 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-[#b0b0b0]">
                  Seçilenler: <span className="text-white font-medium">{selectedServices.map(s => s.name).join(' + ')}</span>
                </span>
              </div>
              <div className="text-right shrink-0 ml-3">
                <span className="text-[11px] text-[#999999] block">Toplam Tutar</span>
                <span className="text-base font-bold text-[#d4af37] font-mono">
                  {totalPrice} ₺
                </span>
              </div>
            </div>
          </div>

          {/* 2. Date Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Tarih Tercihi
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Bugün', 'Yarın', 'Sonraki Gün'].map((day) => {
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#121212] border-[#d4af37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Saat Seansı (Her Saatte Tek Randevu)
              </label>
              {isCurrentSlotBooked && (
                <span className="text-[11px] text-rose-400 font-semibold">
                  Bu saat randevuludur
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                const isBooked = bookedSlots.includes(`${selectedDay}_${time}`);
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isBooked}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-2 rounded-lg border text-center text-xs font-mono font-medium transition-all ${
                      isBooked
                        ? 'bg-[#151515] border-[#222222] text-[#555555] line-through cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'bg-[#d4af37] text-[#121212] border-[#d4af37] font-bold shadow-[0_0_12px_rgba(212,175,55,0.35)] cursor-pointer'
                        : 'bg-[#202020] border-[#303030] text-[#aaaaaa] hover:text-[#f0f0f0] hover:border-[#555555] cursor-pointer'
                    }`}
                    title={isBooked ? 'Randevulu' : 'Müsait'}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                Adınız & Soyadınız
              </label>
              <input
                type="text"
                placeholder="Örn: Ahmet Yılmaz"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#202020] border border-[#333333] text-sm text-[#f5f5f5] placeholder-[#666666] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                Telefon Numaranız
              </label>
              <input
                type="tel"
                placeholder="Örn: 0532 000 0000"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#202020] border border-[#333333] text-sm text-[#f5f5f5] placeholder-[#666666] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* 5. Special Note */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Özel Notunuz (İsteğe Bağlı)
            </label>
            <input
              type="text"
              placeholder="Örn: Sıcak havlu, kafa yapısına uygun kesim..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#202020] border border-[#333333] text-xs text-[#f5f5f5] placeholder-[#666666] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#2a2a2a] space-y-2.5">
            {/* WhatsApp Randevu Butonu */}
            <button
              onClick={handleConfirmAndWhatsApp}
              disabled={isCurrentSlotBooked}
              id="modal-whatsapp-btn"
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer ${
                isCurrentSlotBooked
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#25D366] to-[#1ebe5b] hover:from-[#2bf075] hover:to-[#22d667] text-[#0a2911] shadow-emerald-950/40 active:scale-[0.99]'
              }`}
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp ile Randevuyu Onayla ({totalPrice} ₺)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              {/* Siteden Direkt Randevu Al Butonu */}
              <button
                type="button"
                onClick={handleConfirmDirect}
                disabled={isCurrentSlotBooked}
                className="w-full py-2.5 px-3 rounded-xl bg-[#26241a] hover:bg-[#332e1f] text-[#d4af37] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Site Üzerinden Kaydet</span>
              </button>

              {/* Direkt Ara Butonu */}
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                id="modal-call-btn"
                className="w-full py-2.5 px-3 rounded-xl bg-[#202020] hover:bg-[#282828] text-[#e0e0e0] border border-[#333333] hover:border-[#d4af37]/60 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Telefonla Ara</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

